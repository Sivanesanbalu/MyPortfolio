#!/usr/bin/env python3
import sys
import os
import subprocess
from PySide6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, QLabel,
                               QLineEdit, QPushButton, QTextEdit, QFileDialog, QMessageBox)
from PySide6.QtCore import QSettings, QObject, Signal, QThread

class GitWorker(QObject):
    output = Signal(str)
    finished = Signal()
    error = Signal(str)

    def __init__(self, repo_path, commit_msg):
        super().__init__()
        self.repo_path = repo_path
        self.commit_msg = commit_msg

    def run(self):
        cmds = [
            ['git', 'add', '.'],
            ['git', 'commit', '-m', self.commit_msg],
            ['git', 'push', '-u', 'origin', 'main']
        ]
        for cmd in cmds:
            self.output.emit(f"Running: {' '.join(cmd)}\n")
            try:
                proc = subprocess.Popen(cmd, cwd=self.repo_path, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                stdout, stderr = proc.communicate()
                if stdout:
                    self.output.emit(stdout)
                if stderr:
                    self.output.emit(stderr)
                if proc.returncode != 0:
                    self.error.emit(f"Command {' '.join(cmd)} failed with exit code {proc.returncode}")
                    return
            except Exception as e:
                self.error.emit(str(e))
                return
        self.finished.emit()

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Git Add/Commit/Push")
        self.settings = QSettings('GitPushApp', 'Settings')
        self.repo_path = self.settings.value('repoPath', type=str)

        self._init_ui()
        self._apply_styles()

        # Ensure repo is selected
        self.ensure_repo()

    def _init_ui(self):
        central = QWidget()
        layout = QVBoxLayout()
        central.setLayout(layout)
        self.setCentralWidget(central)

        self.repo_label = QLabel()
        layout.addWidget(self.repo_label)

        self.msg_input = QLineEdit()
        self.msg_input.setPlaceholderText("Enter commit message...")
        layout.addWidget(self.msg_input)

        self.push_button = QPushButton("Add, Commit & Push")
        self.push_button.clicked.connect(self.on_push_clicked)
        layout.addWidget(self.push_button)

        self.log_output = QTextEdit()
        self.log_output.setReadOnly(True)
        layout.addWidget(self.log_output)

        # Menu for changing repo
        menubar = self.menuBar()
        settings_menu = menubar.addMenu("Settings")
        change_repo_action = settings_menu.addAction("Change Repository")
        change_repo_action.triggered.connect(self.change_repo)

    def _apply_styles(self):
        # Minimal modern styling
        self.setStyleSheet("""
            QWidget {
                font-family: Arial, sans-serif;
                font-size: 14px;
            }
            QPushButton {
                padding: 8px 16px;
                border-radius: 12px;
                background-color: #0078d7;
                color: white;
            }
            QPushButton:hover {
                background-color: #005a9e;
            }
            QLineEdit, QTextEdit {
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 4px;
            }
        """)

    def ensure_repo(self):
        while not self.repo_path:
            msg = QMessageBox.question(self, "Select Repository", "No repository configured. Would you like to select a repository?", QMessageBox.Yes | QMessageBox.No)
            if msg == QMessageBox.Yes:
                self.select_repo()
            else:
                QMessageBox.information(self, "Exit", "Application will exit without a repository.")
                sys.exit(0)
        self.update_repo_label()

    def select_repo(self):
        path = QFileDialog.getExistingDirectory(self, "Select Git Repository")
        if not path:
            return
        # Check if .git exists
        git_dir = os.path.join(path, '.git')
        if not os.path.isdir(git_dir):
            reply = QMessageBox.question(self, "Initialize Repository?",
                                         f"The selected directory is not a git repository. Initialize a new git repo at {path}?",
                                         QMessageBox.Yes | QMessageBox.No)
            if reply == QMessageBox.Yes:
                try:
                    proc = subprocess.run(['git', 'init'], cwd=path, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                    if proc.returncode != 0:
                        QMessageBox.critical(self, "Error", f"Failed to initialize git repo: {proc.stderr}")
                        return
                except Exception as e:
                    QMessageBox.critical(self, "Error", str(e))
                    return
            else:
                return
        self.repo_path = path
        self.settings.setValue('repoPath', self.repo_path)
        self.update_repo_label()

    def update_repo_label(self):
        self.repo_label.setText(f"Repository: {self.repo_path}")

    def change_repo(self):
        self.select_repo()

    def on_push_clicked(self):
        if not self.repo_path:
            QMessageBox.warning(self, "No Repository", "Please select a repository first.")
            return
        commit_msg = self.msg_input.text().strip()
        if not commit_msg:
            QMessageBox.warning(self, "Empty Message", "Commit message cannot be empty.")
            return
        # Disable UI
        self.push_button.setEnabled(False)
        self.log_output.clear()
        # Start worker thread
        self.thread = QThread()
        self.worker = GitWorker(self.repo_path, commit_msg)
        self.worker.moveToThread(self.thread)
        self.thread.started.connect(self.worker.run)
        self.worker.output.connect(self.append_log)
        self.worker.error.connect(self.on_error)
        self.worker.finished.connect(self.on_finished)
        self.worker.finished.connect(self.thread.quit)
        self.worker.finished.connect(self.worker.deleteLater)
        self.thread.finished.connect(self.thread.deleteLater)
        self.thread.start()

    def append_log(self, text):
        self.log_output.append(text)

    def on_error(self, err):
        self.append_log(f"Error: {err}")
        QMessageBox.critical(self, "Error", err)
        self.push_button.setEnabled(True)

    def on_finished(self):
        self.append_log("Operation completed successfully.")
        QMessageBox.information(self, "Success", "Add, commit, and push completed.")
        self.push_button.setEnabled(True)
        self.msg_input.clear()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.resize(600, 400)
    window.show()
    sys.exit(app.exec())
