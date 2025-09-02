#!/usr/bin/env python3
"""
Backend API Testing for Portfolio Website
Tests all API endpoints: /api/health, /api/contact, /api/projects, /api/contact-form
"""

import requests
import json
import sys
import os
from typing import Dict, Any, List

# Get base URL from environment or use default
BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'https://creative-coder-15.preview.emergentagent.com')
API_BASE = f"{BASE_URL}/api"

class PortfolioAPITester:
    def __init__(self):
        self.results = {
            'health': {'passed': False, 'details': ''},
            'contact': {'passed': False, 'details': ''},
            'projects': {'passed': False, 'details': ''},
            'contact_form': {'passed': False, 'details': ''},
            'error_handling': {'passed': False, 'details': ''}
        }
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'Portfolio-API-Tester/1.0'
        })

    def test_health_endpoint(self) -> bool:
        """Test /api/health endpoint"""
        print("\n=== Testing Health Endpoint ===")
        try:
            response = self.session.get(f"{API_BASE}/health", timeout=10)
            print(f"Status Code: {response.status_code}")
            print(f"Response Headers: {dict(response.headers)}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Response Data: {json.dumps(data, indent=2)}")
                
                # Verify expected fields
                if 'status' in data and 'message' in data:
                    if data['status'] == 'ok' and 'Portfolio API is running' in data['message']:
                        self.results['health']['passed'] = True
                        self.results['health']['details'] = "✅ Health endpoint working correctly with proper JSON response"
                        print("✅ Health endpoint test PASSED")
                        return True
                    else:
                        self.results['health']['details'] = f"❌ Unexpected response content: {data}"
                else:
                    self.results['health']['details'] = f"❌ Missing required fields (status, message): {data}"
            else:
                self.results['health']['details'] = f"❌ Unexpected status code: {response.status_code}"
                
        except requests.exceptions.RequestException as e:
            self.results['health']['details'] = f"❌ Request failed: {str(e)}"
            print(f"❌ Health endpoint test FAILED: {str(e)}")
        except json.JSONDecodeError as e:
            self.results['health']['details'] = f"❌ Invalid JSON response: {str(e)}"
            print(f"❌ Health endpoint test FAILED: Invalid JSON")
        
        print("❌ Health endpoint test FAILED")
        return False

    def test_contact_endpoint(self) -> bool:
        """Test /api/contact endpoint"""
        print("\n=== Testing Contact Endpoint ===")
        try:
            response = self.session.get(f"{API_BASE}/contact", timeout=10)
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Response Data: {json.dumps(data, indent=2)}")
                
                # Verify expected fields
                required_fields = ['email', 'linkedin', 'github']
                if all(field in data for field in required_fields):
                    # Verify data types and basic format
                    if (isinstance(data['email'], str) and '@' in data['email'] and
                        isinstance(data['linkedin'], str) and data['linkedin'].startswith('https://') and
                        isinstance(data['github'], str) and data['github'].startswith('https://')):
                        self.results['contact']['passed'] = True
                        self.results['contact']['details'] = "✅ Contact endpoint working correctly with proper contact information"
                        print("✅ Contact endpoint test PASSED")
                        return True
                    else:
                        self.results['contact']['details'] = f"❌ Invalid data format in contact fields: {data}"
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.results['contact']['details'] = f"❌ Missing required fields: {missing}"
            else:
                self.results['contact']['details'] = f"❌ Unexpected status code: {response.status_code}"
                
        except requests.exceptions.RequestException as e:
            self.results['contact']['details'] = f"❌ Request failed: {str(e)}"
            print(f"❌ Contact endpoint test FAILED: {str(e)}")
        except json.JSONDecodeError as e:
            self.results['contact']['details'] = f"❌ Invalid JSON response: {str(e)}"
            print(f"❌ Contact endpoint test FAILED: Invalid JSON")
        
        print("❌ Contact endpoint test FAILED")
        return False

    def test_projects_endpoint(self) -> bool:
        """Test /api/projects endpoint"""
        print("\n=== Testing Projects Endpoint ===")
        try:
            response = self.session.get(f"{API_BASE}/projects", timeout=10)
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Response Data: Found {len(data)} projects")
                
                # Verify it's an array
                if isinstance(data, list) and len(data) > 0:
                    # Check first project structure
                    first_project = data[0]
                    required_fields = ['id', 'title', 'description', 'tech']
                    
                    if all(field in first_project for field in required_fields):
                        # Verify data types
                        if (isinstance(first_project['id'], str) and
                            isinstance(first_project['title'], str) and
                            isinstance(first_project['description'], str) and
                            isinstance(first_project['tech'], list)):
                            
                            print(f"Sample project: {first_project['title']}")
                            print(f"Technologies: {', '.join(first_project['tech'])}")
                            
                            self.results['projects']['passed'] = True
                            self.results['projects']['details'] = f"✅ Projects endpoint working correctly with {len(data)} projects"
                            print("✅ Projects endpoint test PASSED")
                            return True
                        else:
                            self.results['projects']['details'] = f"❌ Invalid data types in project fields: {first_project}"
                    else:
                        missing = [f for f in required_fields if f not in first_project]
                        self.results['projects']['details'] = f"❌ Missing required fields in project: {missing}"
                else:
                    self.results['projects']['details'] = f"❌ Expected array of projects, got: {type(data)}"
            else:
                self.results['projects']['details'] = f"❌ Unexpected status code: {response.status_code}"
                
        except requests.exceptions.RequestException as e:
            self.results['projects']['details'] = f"❌ Request failed: {str(e)}"
            print(f"❌ Projects endpoint test FAILED: {str(e)}")
        except json.JSONDecodeError as e:
            self.results['projects']['details'] = f"❌ Invalid JSON response: {str(e)}"
            print(f"❌ Projects endpoint test FAILED: Invalid JSON")
        
        print("❌ Projects endpoint test FAILED")
        return False

    def test_contact_form_endpoint(self) -> bool:
        """Test /api/contact-form POST endpoint"""
        print("\n=== Testing Contact Form Endpoint ===")
        try:
            # Test data for contact form
            test_data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "subject": "Test Contact Form",
                "message": "This is a test message from the API testing suite."
            }
            
            response = self.session.post(f"{API_BASE}/contact-form", 
                                       json=test_data, 
                                       timeout=10)
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Response Data: {json.dumps(data, indent=2)}")
                
                # Verify response structure
                if 'message' in data and 'received' in data:
                    if isinstance(data['received'], dict) and data['received'] == test_data:
                        self.results['contact_form']['passed'] = True
                        self.results['contact_form']['details'] = "✅ Contact form endpoint working correctly, accepts POST data"
                        print("✅ Contact form endpoint test PASSED")
                        return True
                    else:
                        self.results['contact_form']['details'] = f"❌ Received data doesn't match sent data: {data['received']}"
                else:
                    self.results['contact_form']['details'] = f"❌ Missing required response fields (message, received): {data}"
            else:
                self.results['contact_form']['details'] = f"❌ Unexpected status code: {response.status_code}"
                
        except requests.exceptions.RequestException as e:
            self.results['contact_form']['details'] = f"❌ Request failed: {str(e)}"
            print(f"❌ Contact form endpoint test FAILED: {str(e)}")
        except json.JSONDecodeError as e:
            self.results['contact_form']['details'] = f"❌ Invalid JSON response: {str(e)}"
            print(f"❌ Contact form endpoint test FAILED: Invalid JSON")
        
        print("❌ Contact form endpoint test FAILED")
        return False

    def test_error_handling(self) -> bool:
        """Test error handling for invalid endpoints"""
        print("\n=== Testing Error Handling ===")
        try:
            # Test invalid GET endpoint
            response = self.session.get(f"{API_BASE}/nonexistent", timeout=10)
            print(f"Invalid GET endpoint status: {response.status_code}")
            
            if response.status_code == 404:
                data = response.json()
                print(f"Error response: {json.dumps(data, indent=2)}")
                
                if 'error' in data and 'not found' in data['error'].lower():
                    # Test invalid POST endpoint
                    response_post = self.session.post(f"{API_BASE}/invalid-post", 
                                                    json={"test": "data"}, 
                                                    timeout=10)
                    print(f"Invalid POST endpoint status: {response_post.status_code}")
                    
                    if response_post.status_code == 404:
                        post_data = response_post.json()
                        if 'error' in post_data and 'not found' in post_data['error'].lower():
                            self.results['error_handling']['passed'] = True
                            self.results['error_handling']['details'] = "✅ Error handling working correctly for invalid endpoints"
                            print("✅ Error handling test PASSED")
                            return True
                        else:
                            self.results['error_handling']['details'] = f"❌ Invalid POST error response format: {post_data}"
                    else:
                        self.results['error_handling']['details'] = f"❌ Invalid POST endpoint returned wrong status: {response_post.status_code}"
                else:
                    self.results['error_handling']['details'] = f"❌ Invalid GET error response format: {data}"
            else:
                self.results['error_handling']['details'] = f"❌ Invalid GET endpoint returned wrong status: {response.status_code}"
                
        except requests.exceptions.RequestException as e:
            self.results['error_handling']['details'] = f"❌ Request failed: {str(e)}"
            print(f"❌ Error handling test FAILED: {str(e)}")
        except json.JSONDecodeError as e:
            self.results['error_handling']['details'] = f"❌ Invalid JSON response: {str(e)}"
            print(f"❌ Error handling test FAILED: Invalid JSON")
        
        print("❌ Error handling test FAILED")
        return False

    def run_all_tests(self) -> Dict[str, Any]:
        """Run all API tests"""
        print(f"🚀 Starting Portfolio API Tests")
        print(f"Base URL: {BASE_URL}")
        print(f"API Base: {API_BASE}")
        print("=" * 60)
        
        # Run all tests
        tests = [
            ('Health Endpoint', self.test_health_endpoint),
            ('Contact Endpoint', self.test_contact_endpoint),
            ('Projects Endpoint', self.test_projects_endpoint),
            ('Contact Form Endpoint', self.test_contact_form_endpoint),
            ('Error Handling', self.test_error_handling)
        ]
        
        passed_count = 0
        total_count = len(tests)
        
        for test_name, test_func in tests:
            try:
                if test_func():
                    passed_count += 1
            except Exception as e:
                print(f"❌ {test_name} test encountered unexpected error: {str(e)}")
        
        # Print summary
        print("\n" + "=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        
        for endpoint, result in self.results.items():
            status = "✅ PASSED" if result['passed'] else "❌ FAILED"
            print(f"{endpoint.upper()}: {status}")
            print(f"  Details: {result['details']}")
            print()
        
        print(f"Overall Result: {passed_count}/{total_count} tests passed")
        
        if passed_count == total_count:
            print("🎉 All API tests PASSED!")
            return {'success': True, 'passed': passed_count, 'total': total_count, 'results': self.results}
        else:
            print("⚠️  Some API tests FAILED!")
            return {'success': False, 'passed': passed_count, 'total': total_count, 'results': self.results}

def main():
    """Main function to run API tests"""
    tester = PortfolioAPITester()
    results = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if results['success'] else 1)

if __name__ == "__main__":
    main()