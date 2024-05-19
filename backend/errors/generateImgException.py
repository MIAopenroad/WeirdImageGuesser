class GenerateImgException(Exception):
    def __init__(self, img_prompt) -> None:
        self.img_prompt = img_prompt

    def __str__(self):
        return f"Failed to generate image from {self.img_prompt}"
