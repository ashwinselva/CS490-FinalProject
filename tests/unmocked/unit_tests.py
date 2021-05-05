import unittest
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath('../')))
import app
from app import image_url_url
from app import get_bucket_name


test_image = 'unit_test.jpg'

class TestMain(unittest.TestCase):
    
    def setUp(self):
        app.GBUCKET = 'cs490-testbucket'
        
    def testImageURL(self):
        test_output = app.image_url_url(test_image)
        self.assertEqual(test_output, 'https://storage.googleapis.com/' + app.GBUCKET + '/' + test_image)
        
    def testGetBucketName(self):
        test_output = app.get_bucket_name()
        self.assertEqual(test_output, app.GBUCKET)
        
        
if __name__ == "__main__":
    unittest.main()