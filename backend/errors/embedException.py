class EmbedException(Exception):
    def __init__(self, args):
        self.args = args

    def __str__(self):
        return f"Failed to embed {self.args}."
