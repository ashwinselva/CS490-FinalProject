'''
    mocked tests
'''

import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from app import User,Pool, Image, PoolItem
import model
from app import add_user, add_pool, add_image


NAME_INPUT = "username"
PASS_INPUT = "password"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = "user123"

class AddUserTestCase(unittest.TestCase):
    def SetUp(self):
        self.success_test_params = [
            {
                NAME_INPUT: 'person2',
                PASS_INPUT: 'pass',
                KEY_EXPECTED: True
            }
        ]
        initial_person = User(username=INITIAL_USERNAME, password=105)
        self.initial_db_mock = [initial_person]
        
    def mocked_db_session_add(self, username):
        self.initial_db_mock.append(username)
        
    def mocked_db_session_commit(self):
        pass
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit', self.mocked_db_session_commit):
    
                    print(self.initial_db_mock)
                    actual_result = add_user(test[NAME_INPUT],test[PASS_INPUT])
                    print(actual_result)
                    expected_result = test[KEY_EXPECTED]
                    print(self.initial_db_mock)
                    print(expected_result)
                        
                    self.assertEqual(actual_result, expected_result)