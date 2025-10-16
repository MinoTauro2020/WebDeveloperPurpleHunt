#!/usr/bin/env python3
"""
Backend API Testing for PurpleHunt.es
Tests the contact form endpoints with comprehensive validation scenarios
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from frontend environment
BACKEND_URL = "https://cyber-fortress-3.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        
    def log_result(self, test_name, success, message=""):
        self.results["total_tests"] += 1
        if success:
            self.results["passed"] += 1
            print(f"✅ {test_name}: PASSED {message}")
        else:
            self.results["failed"] += 1
            self.results["errors"].append(f"{test_name}: {message}")
            print(f"❌ {test_name}: FAILED {message}")
    
    def test_post_contact_valid_data(self):
        """Test POST /api/contact with valid data"""
        test_data = {
            "nombre": "Carlos Mendoza",
            "email": "carlos.mendoza@empresa.com",
            "empresa": "TechCorp Solutions",
            "mensaje": "Estamos interesados en sus servicios de Purple Team para evaluar nuestra infraestructura de ciberseguridad."
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contact", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if (data.get("success") == True and 
                    data.get("message") == "Mensaje enviado correctamente" and 
                    data.get("id")):
                    self.log_result("POST /api/contact - Valid Data", True, f"ID: {data.get('id')}")
                    return data.get("id")
                else:
                    self.log_result("POST /api/contact - Valid Data", False, f"Invalid response structure: {data}")
            else:
                self.log_result("POST /api/contact - Valid Data", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("POST /api/contact - Valid Data", False, f"Exception: {str(e)}")
        
        return None
    
    def test_post_contact_missing_fields(self):
        """Test POST /api/contact with missing required fields"""
        test_cases = [
            ({}, "Empty payload"),
            ({"email": "test@test.com"}, "Missing nombre, empresa, mensaje"),
            ({"nombre": "Test", "email": "test@test.com"}, "Missing empresa, mensaje"),
            ({"nombre": "Test", "email": "test@test.com", "empresa": "Test Corp"}, "Missing mensaje")
        ]
        
        for test_data, description in test_cases:
            try:
                response = requests.post(f"{BACKEND_URL}/contact", json=test_data, timeout=10)
                
                if response.status_code == 422:  # FastAPI validation error
                    self.log_result(f"POST /api/contact - {description}", True, "Correctly rejected")
                else:
                    self.log_result(f"POST /api/contact - {description}", False, f"Expected 422, got {response.status_code}")
            except Exception as e:
                self.log_result(f"POST /api/contact - {description}", False, f"Exception: {str(e)}")
    
    def test_post_contact_invalid_email(self):
        """Test POST /api/contact with invalid email formats"""
        invalid_emails = [
            "invalid-email",
            "test@",
            "@domain.com",
            "test..test@domain.com",
            "test@domain",
            ""
        ]
        
        for email in invalid_emails:
            test_data = {
                "nombre": "Test User",
                "email": email,
                "empresa": "Test Company",
                "mensaje": "This is a test message with more than 10 characters."
            }
            
            try:
                response = requests.post(f"{BACKEND_URL}/contact", json=test_data, timeout=10)
                
                if response.status_code == 422:
                    self.log_result(f"POST /api/contact - Invalid Email ({email})", True, "Correctly rejected")
                else:
                    self.log_result(f"POST /api/contact - Invalid Email ({email})", False, f"Expected 422, got {response.status_code}")
            except Exception as e:
                self.log_result(f"POST /api/contact - Invalid Email ({email})", False, f"Exception: {str(e)}")
    
    def test_post_contact_message_length_validation(self):
        """Test POST /api/contact message length validation (10-2000 characters)"""
        test_cases = [
            ("Short", "Too short message (< 10 chars)"),
            ("A" * 2001, "Too long message (> 2000 chars)")
        ]
        
        for mensaje, description in test_cases:
            test_data = {
                "nombre": "Test User",
                "email": "test@example.com",
                "empresa": "Test Company",
                "mensaje": mensaje
            }
            
            try:
                response = requests.post(f"{BACKEND_URL}/contact", json=test_data, timeout=10)
                
                if response.status_code == 422:
                    self.log_result(f"POST /api/contact - {description}", True, "Correctly rejected")
                else:
                    self.log_result(f"POST /api/contact - {description}", False, f"Expected 422, got {response.status_code}")
            except Exception as e:
                self.log_result(f"POST /api/contact - {description}", False, f"Exception: {str(e)}")
    
    def test_post_contact_field_length_validation(self):
        """Test POST /api/contact field length validation"""
        test_cases = [
            ({"nombre": ""}, "Empty nombre"),
            ({"nombre": "A" * 201}, "Nombre too long (> 200 chars)"),
            ({"empresa": ""}, "Empty empresa"),
            ({"empresa": "A" * 201}, "Empresa too long (> 200 chars)")
        ]
        
        base_data = {
            "nombre": "Test User",
            "email": "test@example.com",
            "empresa": "Test Company",
            "mensaje": "This is a valid test message with more than 10 characters."
        }
        
        for field_override, description in test_cases:
            test_data = {**base_data, **field_override}
            
            try:
                response = requests.post(f"{BACKEND_URL}/contact", json=test_data, timeout=10)
                
                if response.status_code == 422:
                    self.log_result(f"POST /api/contact - {description}", True, "Correctly rejected")
                else:
                    self.log_result(f"POST /api/contact - {description}", False, f"Expected 422, got {response.status_code}")
            except Exception as e:
                self.log_result(f"POST /api/contact - {description}", False, f"Exception: {str(e)}")
    
    def test_get_contacts(self):
        """Test GET /api/contact endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/contact", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("GET /api/contact - Basic Functionality", True, f"Returned {len(data)} contacts")
                    
                    # Check if contacts are sorted by date (most recent first)
                    if len(data) > 1:
                        dates_sorted = True
                        for i in range(len(data) - 1):
                            current_date = datetime.fromisoformat(data[i]['created_at'].replace('Z', '+00:00'))
                            next_date = datetime.fromisoformat(data[i+1]['created_at'].replace('Z', '+00:00'))
                            if current_date < next_date:
                                dates_sorted = False
                                break
                        
                        self.log_result("GET /api/contact - Date Sorting", dates_sorted, 
                                      "Contacts sorted by date (newest first)" if dates_sorted else "Contacts not properly sorted")
                    
                    # Check data structure of first contact if available
                    if len(data) > 0:
                        contact = data[0]
                        required_fields = ['id', 'nombre', 'email', 'empresa', 'mensaje', 'created_at']
                        has_all_fields = all(field in contact for field in required_fields)
                        self.log_result("GET /api/contact - Data Structure", has_all_fields,
                                      "All required fields present" if has_all_fields else f"Missing fields: {[f for f in required_fields if f not in contact]}")
                else:
                    self.log_result("GET /api/contact - Basic Functionality", False, f"Expected list, got {type(data)}")
            else:
                self.log_result("GET /api/contact - Basic Functionality", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("GET /api/contact - Basic Functionality", False, f"Exception: {str(e)}")
    
    def test_backend_connectivity(self):
        """Test basic backend connectivity"""
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_result("Backend Connectivity", True, "Backend is accessible")
                else:
                    self.log_result("Backend Connectivity", False, f"Unexpected response: {data}")
            else:
                self.log_result("Backend Connectivity", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Backend Connectivity", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for PurpleHunt.es")
        print(f"📡 Backend URL: {BACKEND_URL}")
        print("=" * 80)
        
        # Test backend connectivity first
        self.test_backend_connectivity()
        
        # Test POST /api/contact endpoint
        print("\n📝 Testing POST /api/contact endpoint:")
        self.test_post_contact_valid_data()
        self.test_post_contact_missing_fields()
        self.test_post_contact_invalid_email()
        self.test_post_contact_message_length_validation()
        self.test_post_contact_field_length_validation()
        
        # Test GET /api/contact endpoint
        print("\n📋 Testing GET /api/contact endpoint:")
        self.test_get_contacts()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY:")
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"Passed: {self.results['passed']}")
        print(f"Failed: {self.results['failed']}")
        
        if self.results['errors']:
            print("\n❌ FAILED TESTS:")
            for error in self.results['errors']:
                print(f"  - {error}")
        
        success_rate = (self.results['passed'] / self.results['total_tests']) * 100 if self.results['total_tests'] > 0 else 0
        print(f"\n✨ Success Rate: {success_rate:.1f}%")
        
        return self.results['failed'] == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)