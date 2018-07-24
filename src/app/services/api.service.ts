import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pick } from 'lodash';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.get('/profile');
  }

  login(data) {
    const params = pick(data, [
      'email', 'password'
    ]);

    return this.post('/users/login', params);
  }

  verifyToken(token) {
    return this.post('/users/verify', { token });
  }

  resend(email) {
    return this.post('/users/resend', { email });
  }

  register(data) {
    const params = pick(data, [
      'email', 'password', 'firstname', 'lastname'
    ]);

    return this.post('/users/register', params);
  }

  updateProfile(data) {
    const params = pick(data, [
      'email', 'firstname', 'lastname'
    ]);

    return this.post('/users/profile', data);
  }

  changePassword(data) {
    const params = pick(data, [
      'oldPassword', 'newPassword'
    ]);

    return this.post('/users/change-password', params);
  }

  filterApartments(data) {
    const params = pick(data, [
      'sizeOp', 'sizeVal', 'priceOp', 'priceVal', 'roomsOp', 'roomsVal'
    ]);

    if (params.sizeOp === '') {
      delete params.sizeOp;
    }

    if (params.priceOp === '') {
      delete params.priceOp;
    }

    if (params.roomsOp === '') {
      delete params.roomsOp;
    }

    return this.get('/apartments', params);
  }

  getApartment(id) {
    return this.get(`/apartments/${id}`);
  }

  createApartment(data) {
    const params = pick(data, [
      'name', 'description', 'floorAreaSize', 'pricePerMonth', 'numberOfRooms', 'address', 'latitude', 'longitude', 'status', 'realtor'
    ]);

    return this.post(`/apartments`, params);
  }

  updateApartment(data) {
    const params = pick(data, [
      'name', 'description', 'floorAreaSize', 'pricePerMonth', 'numberOfRooms', 'address', 'latitude', 'longitude', 'status', 'realtor'
    ]);

    return this.put(`/apartments/${data._id}`, params);
  }

  deleteApartment(id) {
    return this.delete(`/apartments/${id}`);
  }

  getAllUsers() {
    return this.get('/users');
  }

  createUser(data) {
    const params = pick(data, [
      'email', 'password', 'firstname', 'lastname', 'role', 'verified'
    ]);

    return this.post('/users', params);
  }

  getUser(id) {
    return this.get(`/users/${id}`);
  }

  updateUser(data) {
    const params = pick(data, [
      'email', 'password', 'firstname', 'lastname', 'role', 'verified'
    ]);

    return this.put(`/users/${data._id}`, params);
  }

  deleteUser(id) {
    return this.delete(`/users/${id}`);
  }

  getRealtors() {
    return this.get('/users?role=realtor');
  }

  lookupAddress(lat, lng) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.GOOGLE_API_KEY}`)
  }

  lookupIPLocation() {
    return this.http.get('http://ip-api.com/json');
  }

  private get(url, params = null) {
    if (params) {
      return this.http.get(environment.BASE_URL + url, { params });
    }

    return this.http.get(environment.BASE_URL + url);
  }

  private post(url, data) {
    return this.http.post(environment.BASE_URL + url, data);
  }

  private put(url, data) {
    return this.http.put(environment.BASE_URL + url, data);
  }

  private delete(url) {
    return this.http.delete(environment.BASE_URL + url);
  }
}
