import unittest
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath('../')))
import app
from app import image_URL

class TestMain(unittest.TestCase):
    
    def setUp(self):
        app.GBUCKET = 'cs490-testbucket'
    
    def testImageURL(self):
        test_image = 'unit_test.jpg'
        test_output = app.image_URL(test_image)
        self.assertEqual(test_output, 'https://storage.googleapis.com/' + app.GBUCKET + '/' + test_image)
        
if __name__ == "__main__":
    unittest.main()