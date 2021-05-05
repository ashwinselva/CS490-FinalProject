import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath('../')))
import app
from app import image_URL


test_image = 'unit_test.jpg'
image_list = [test_image]

class TestMain(unittest.TestCase):
    
    def setUp(self):
        app.GBUCKET = 'cs490-testbucket'
        
    @patch('app.image_exists')
    def mocked_image_exists(self, name):
        global image_list
        if name in image_list:
            return True
        return False
    
    def testImageURL(self):
        test_output = app.image_URL(test_image)
        self.assertEqual(test_output, 'https://storage.googleapis.com/' + app.GBUCKET + '/' + test_image)
        
    def testFormatImage(self):
        with patch('app.image_exists'):
            test_output = app.format_image(test_image)
            self.assertEqual(test_output, 'unit_test1.jpg')
        
    
        
if __name__ == "__main__":
    unittest.main()