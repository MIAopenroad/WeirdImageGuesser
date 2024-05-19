class ImagePromptException(Exception):
    def __str__(self):
        return "Failed to generate image prompt."
