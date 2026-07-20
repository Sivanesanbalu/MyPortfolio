import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from bs4 import BeautifulSoup
import os
import re
from datetime import datetime

# --- Core Logic (Separated from GUI) ---

def find_next_post_id(soup):
    """Finds the next available post ID (e.g., post6)."""
    max_id = 0
    # Find all articles with an ID starting with 'post' followed by digits
    posts = soup.find_all('article', id=re.compile(r'^post\d+$'))
    for post in posts:
        post_id = post.get('id', '')
        match = re.match(r'post(\d+)', post_id)
        if match:
            current_id = int(match.group(1))
            if current_id > max_id:
                max_id = current_id
    return f"post{max_id + 1}"

def add_blog_post(html_file_path, title, tags_str, description, read_time, date_str, post_filename):
    """Reads, modifies, and saves the blog home page. Returns (success_boolean, message_string)."""

    if not html_file_path or not os.path.exists(html_file_path):
        return False, f"Error: HTML file not found or path not specified: {html_file_path}"

    # --- 1. Read the file ---
    try:
        with open(html_file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return False, f"Error reading file '{html_file_path}': {e}"

    # --- 2. Parse the HTML ---
    try:
        soup = BeautifulSoup(content, 'html.parser')
    except Exception as e:
        return False, f"Error parsing HTML: {e}"

    # --- 3. Find insertion point ---
    main_content = soup.find('main', id='blogPosts')
    if not main_content:
        # Try finding just the main tag if id isn't present (less reliable)
        main_content = soup.find('main')
        if not main_content:
             return False, "Error: Could not find <main id='blogPosts'> tag or <main> tag."
        else:
            print("Warning: Found <main> tag but not specific id='blogPosts'. Inserting into first <main>.")


    # --- 4. Prepare data ---
    next_id = find_next_post_id(soup)
    # Clean up tags: split by comma, strip whitespace, remove empty strings
    tags_list = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
    if not tags_list:
        return False, "Error: Please provide at least one tag."

    data_tags_attr = ", ".join(tags_list) # Format for data-tags attribute
    # Create HTML spans for each tag
    tags_html = ''.join([f'<span class="tag" data-tag="{tag.lower()}">{tag}</span>\n          ' for tag in tags_list]).strip()

    # Simple validation/formatting for filename
    if not post_filename.lower().endswith('.html'):
        post_filename += ".html"

    # --- 5. Generate new post HTML ---
    # Using triple quotes for multi-line string
    new_post_html_str = f"""<article class="post-card" data-tags="{data_tags_attr}" data-date="{date_str}" id="{next_id}">
        <div class="post-meta">
          <span>{date_str}</span>
          <span>•</span>
          <span>{read_time}</span>
        </div>
        <h2><a href="{post_filename}">{title}</a></h2>
        <div class="post-tags">
          {tags_html}
        </div>
        <p class="post-excerpt">
          {description}
        </p>
        <a href="{post_filename}" class="read-more">Continue Reading <span class="arrow">→</span></a>
      </article>""" # Removed the extra newline before </article> for bs4 insertion

    # --- 6. Insert the new post ---
    try:
        # Convert string to Soup object/tag to insert it correctly
        # We parse the *string* containing the new article
        new_post_soup = BeautifulSoup(new_post_html_str, 'html.parser').find('article')

        if new_post_soup:
            # Insert the new post soup object at the beginning of the main content
            main_content.insert(0, new_post_soup)
            # Optionally, insert a newline before it for formatting in the source file
            main_content.insert(0, "\n      ")
        else:
            return False, "Error: Failed to create BeautifulSoup object for the new post."

    except Exception as e:
        return False, f"Error inserting new post HTML: {e}"


    # --- 7. Write the modified file back ---
    try:
        # Make a backup before overwriting (optional but recommended)
        backup_path = html_file_path + ".bak"
        import shutil
        shutil.copy2(html_file_path, backup_path)
        # print(f"Backup created at {backup_path}") # Optional console message

        with open(html_file_path, 'w', encoding='utf-8') as f:
            # Use prettify() for readable output, but be aware it might
            # slightly alter whitespace/formatting elsewhere in the file.
            # Using str(soup) makes minimal changes but might be less readable.
            f.write(soup.prettify(formatter="html5")) # Use html5 formatter for better handling

        return True, f"Successfully added post '{title}' to {os.path.basename(html_file_path)}.\nBackup saved as {os.path.basename(backup_path)}"
    except Exception as e:
        return False, f"Error writing file '{html_file_path}': {e}"


# --- GUI Application Class ---

class BlogPostAdderApp:
    def __init__(self, master):
        self.master = master
        master.title("Blog Post Adder")
        # master.geometry("600x550") # Optional: set initial size

        # Style
        self.style = ttk.Style()
        self.style.theme_use('clam') # Or 'alt', 'default', 'classic'

        # Main Frame
        main_frame = ttk.Frame(master, padding="20")
        main_frame.pack(expand=True, fill=tk.BOTH)

        # --- File Path ---
        file_frame = ttk.Frame(main_frame)
        file_frame.pack(fill=tk.X, pady=(0, 10))

        ttk.Label(file_frame, text="Blog Home HTML File:").pack(side=tk.LEFT, padx=(0, 5))
        self.file_path_var = tk.StringVar()
        self.file_entry = ttk.Entry(file_frame, textvariable=self.file_path_var, width=50)
        self.file_entry.pack(side=tk.LEFT, expand=True, fill=tk.X, padx=(0, 5))
        self.browse_button = ttk.Button(file_frame, text="Browse...", command=self.browse_file)
        self.browse_button.pack(side=tk.LEFT)

        # --- Input Fields ---
        input_frame = ttk.LabelFrame(main_frame, text="New Post Details", padding="15")
        input_frame.pack(expand=True, fill=tk.BOTH)

        # Configure grid layout
        input_frame.columnconfigure(1, weight=1) # Make entry column expandable

        # Title
        ttk.Label(input_frame, text="Post Title:").grid(row=0, column=0, sticky=tk.W, pady=5, padx=5)
        self.title_entry = ttk.Entry(input_frame, width=50)
        self.title_entry.grid(row=0, column=1, sticky=tk.EW, pady=5, padx=5)

        # Tags
        ttk.Label(input_frame, text="Tags (comma-separated):").grid(row=1, column=0, sticky=tk.W, pady=5, padx=5)
        self.tags_entry = ttk.Entry(input_frame)
        self.tags_entry.grid(row=1, column=1, sticky=tk.EW, pady=5, padx=5)

        # Description/Excerpt
        ttk.Label(input_frame, text="Description/Excerpt:").grid(row=2, column=0, sticky=tk.NW, pady=5, padx=5) # NorthWest align
        self.desc_text = tk.Text(input_frame, height=6, width=50, wrap=tk.WORD, relief=tk.SOLID, borderwidth=1)
        self.desc_text.grid(row=2, column=1, sticky=tk.EW, pady=5, padx=5)
        # Add scrollbar for description
        desc_scrollbar = ttk.Scrollbar(input_frame, orient=tk.VERTICAL, command=self.desc_text.yview)
        desc_scrollbar.grid(row=2, column=2, sticky=tk.NS)
        self.desc_text['yscrollcommand'] = desc_scrollbar.set

        # Reading Time
        ttk.Label(input_frame, text="Reading Time:").grid(row=3, column=0, sticky=tk.W, pady=5, padx=5)
        self.read_time_entry = ttk.Entry(input_frame)
        self.read_time_entry.grid(row=3, column=1, sticky=tk.EW, pady=5, padx=5)
        self.read_time_entry.insert(0, " min read") # Pre-fill suggestion

        # Date
        ttk.Label(input_frame, text="Date:").grid(row=4, column=0, sticky=tk.W, pady=5, padx=5)
        self.date_var = tk.StringVar()
        self.date_entry = ttk.Entry(input_frame, textvariable=self.date_var)
        self.date_entry.grid(row=4, column=1, sticky=tk.EW, pady=5, padx=5)
        self.set_default_date() # Set current date

        # Post HTML Filename
        ttk.Label(input_frame, text="Post HTML Filename:").grid(row=5, column=0, sticky=tk.W, pady=5, padx=5)
        self.filename_entry = ttk.Entry(input_frame)
        self.filename_entry.grid(row=5, column=1, sticky=tk.EW, pady=5, padx=5)
        self.filename_entry.insert(0, "blogX.html") # Placeholder

        # --- Submit Button ---
        self.submit_button = ttk.Button(main_frame, text="Generate & Add Post", command=self.submit_post, style='Accent.TButton')
        self.submit_button.pack(pady=(15, 0))

        # Add style for accent button if possible
        try:
            self.style.configure('Accent.TButton', font=('Helvetica', 10, 'bold'))
        except tk.TclError:
            print("Warning: 'Accent.TButton' style might not be available on all systems.")


    def browse_file(self):
        """Opens a file dialog to select the bloghome.html file."""
        filepath = filedialog.askopenfilename(
            title="Select bloghome.html",
            filetypes=[("HTML files", "*.html"), ("All files", "*.*")]
        )
        if filepath:
            self.file_path_var.set(filepath)

    def set_default_date(self):
        """Sets the date entry to the current date in 'Mon DD, YYYY' format."""
        today = datetime.now()
        # Format: Mar 08, 2025 (Uses abbreviated month)
        formatted_date = today.strftime("%b %d, %Y")
        self.date_var.set(formatted_date)

    def validate_inputs(self):
        """Basic validation for required fields."""
        if not self.file_path_var.get():
            messagebox.showwarning("Missing Input", "Please select the blog HTML file.")
            return False
        if not self.title_entry.get():
            messagebox.showwarning("Missing Input", "Please enter a Post Title.")
            return False
        if not self.tags_entry.get():
            messagebox.showwarning("Missing Input", "Please enter at least one Tag.")
            return False
        if not self.desc_text.get("1.0", tk.END).strip():
            messagebox.showwarning("Missing Input", "Please enter a Description/Excerpt.")
            return False
        if not self.read_time_entry.get():
             messagebox.showwarning("Missing Input", "Please enter the Reading Time.")
             return False
        if not self.date_var.get():
             messagebox.showwarning("Missing Input", "Please enter the Date.")
             return False
        if not self.filename_entry.get():
             messagebox.showwarning("Missing Input", "Please enter the Post HTML Filename.")
             return False
        return True

    def submit_post(self):
        """Handles the submit button click."""
        if not self.validate_inputs():
            return

        # Get all values
        html_file = self.file_path_var.get()
        title = self.title_entry.get()
        tags = self.tags_entry.get()
        desc = self.desc_text.get("1.0", tk.END).strip() # Get text from Text widget
        read_time = self.read_time_entry.get()
        date = self.date_var.get()
        filename = self.filename_entry.get()

        # Call the core logic function
        success, message = add_blog_post(html_file, title, tags, desc, read_time, date, filename)

        if success:
            messagebox.showinfo("Success", message)
            # Optional: Clear fields after successful submission
            # self.title_entry.delete(0, tk.END)
            # self.tags_entry.delete(0, tk.END)
            # self.desc_text.delete("1.0", tk.END)
            # self.read_time_entry.delete(0, tk.END)
            # self.set_default_date() # Reset date
            # self.filename_entry.delete(0, tk.END)
        else:
            messagebox.showerror("Error", message)


# --- Main Execution ---
if __name__ == "__main__":
    root = tk.Tk()
    app = BlogPostAdderApp(root)
    root.mainloop()