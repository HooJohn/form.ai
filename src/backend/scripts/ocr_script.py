import sys
from paddleocr import PaddleOCR
import json

def perform_ocr(image_path):
    """
    Performs OCR on a single image and prints the result as a JSON string.
    """
    try:
        # Initialize PaddleOCR. It will download models on first run.
        # `lang='ch'` enables models for Chinese and English.
        # The `use_angle_cls` parameter is deprecated, replaced by `use_textline_orientation`.
        # The `use_gpu` parameter has been removed in newer versions.
        ocr = PaddleOCR(use_textline_orientation=True, lang='ch')
        
        # Use the modern `predict` method.
        result = ocr.predict(image_path)
        
        # The result is a list of lists, we need to format it.
        # Each item in the outer list is a detected line.
        # Each line contains [bounding_box, (text, confidence_score)]
        
        formatted_result = []
        if result and result[0]:
            for line in result[0]:
                box = line[0]
                text, score = line[1]
                formatted_result.append({
                    'text': text,
                    'confidence': score,
                    'box': {
                        'topLeft': box[0],
                        'topRight': box[1],
                        'bottomRight': box[2],
                        'bottomLeft': box[3]
                    }
                })
        
        # Print result as a JSON string to stdout
        print(json.dumps(formatted_result, ensure_ascii=False))

    except Exception as e:
        # Print error to stderr
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        image_path_arg = sys.argv[1]
        perform_ocr(image_path_arg)
    else:
        print(json.dumps({"error": "No image path provided."}), file=sys.stderr)
        sys.exit(1)
