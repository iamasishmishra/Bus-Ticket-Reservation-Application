package org.jsp.reservationapi.service;

import java.util.Optional;

import org.jsp.reservationapi.dto.UserResponse;
import org.jsp.reservationapi.dao.UserDao;
import org.jsp.reservationapi.dto.EmailConfiguration;
import org.jsp.reservationapi.dto.ResponseStructure;
import org.jsp.reservationapi.dto.UserRequest;
import org.jsp.reservationapi.exception.UserNotFoundException;
import org.jsp.reservationapi.model.User;
import org.jsp.reservationapi.util.AccountStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private LinkGeneratorService linkGeneratorService;
	@Autowired
	private ReservationApiMailService mailService;
	@Autowired
	private EmailConfiguration emailConfiguration;

	
	public ResponseEntity<ResponseStructure<UserResponse>> saveUser(UserRequest userRequest, HttpServletRequest request) {
		ResponseStructure<UserResponse> structure = new ResponseStructure<>();
		User user = mapToUser(userRequest);
		user.setStatus(AccountStatus.IN_ACTIVE.toString());
		user = userDao.saveUser(user);
		String activation_link = linkGeneratorService.getActivationLink(user, request);
		emailConfiguration.setSubject("Activate Your Account");
		emailConfiguration.setText("Dear User Please Activate Your Account by clicking on the following link:" + activation_link);
		emailConfiguration.setToAddress(user.getEmail());
		structure.setMessage(mailService.sendMail(emailConfiguration));
		structure.setData(mapToUserResponse(user));
		structure.setStatusCode(HttpStatus.CREATED.value());
		return ResponseEntity.status(HttpStatus.CREATED).body(structure);
	}
	
	
	public ResponseEntity<ResponseStructure<UserResponse>> update(UserRequest userRequest, int id) {
		Optional<User> recUser = userDao.findUserById(id);
		ResponseStructure<UserResponse> structure = new ResponseStructure<>();
		
		if (recUser.isPresent()) {
			
			User dbUser  = recUser.get();
			dbUser.setEmail(userRequest.getEmail());
			dbUser.setAge(userRequest.getAge());
			dbUser.setGender(userRequest.getGender());
			dbUser.setName(userRequest.getName());
			dbUser.setPassword(userRequest.getPassword());
			dbUser.setPhone(userRequest.getPhone());
			
			structure.setData(mapToUserResponse(userDao.saveUser(dbUser)));
			structure.setMessage("User Updated");
			structure.setStatusCode(HttpStatus.ACCEPTED.value());
			
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(structure);
		}
		throw new UserNotFoundException("Cannot Update User as Id is Invalid");
	}
	
	
	
	public ResponseEntity<ResponseStructure<UserResponse>> findUserById(int id){
		ResponseStructure<UserResponse> structure = new ResponseStructure<>();
		Optional<User> reUser = userDao.findUserById(id);
		
		if(reUser.isPresent()) {
			structure.setData(mapToUserResponse(reUser.get()));
			structure.setMessage("User Found");
			structure.setStatusCode(HttpStatus.OK.value());
			
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new UserNotFoundException("Invalid User Id");
	}
	
	
	public ResponseEntity<ResponseStructure<UserResponse>> verifyUserByPhoneAndPassword(long phone, String password) {
		ResponseStructure<UserResponse> structure = new ResponseStructure<>();
		Optional<User> dbUser = userDao.verifyUserByPhoneAndPassword(phone, password);
		
		if (dbUser.isPresent()) {
			User user = dbUser.get();
			if (user.getStatus().equals(AccountStatus.IN_ACTIVE.toString()))
				throw new IllegalStateException("Please Activate Your Account before You SignIn");

			structure.setData(mapToUserResponse(dbUser.get()));
			structure.setMessage("Verification Succesfull");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new UserNotFoundException("Invalid Phone Number or Password");
	}	

	
	public ResponseEntity<ResponseStructure<UserResponse>> verifyUserByEmailAndPassword(String email, String password) {
		ResponseStructure<UserResponse> structure = new ResponseStructure<>();
		Optional<User> dbUser = userDao.verifyUserByEmailAndPassword(email, password);
		
		if (dbUser.isPresent()) {
			User user = dbUser.get();
			if (user.getStatus().equals(AccountStatus.IN_ACTIVE.toString()))
				throw new IllegalStateException("Please Activate Your Account before You SignIn");

			structure.setData(mapToUserResponse(user));
			structure.setMessage("Verification Succesfull");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new UserNotFoundException("Invalid Email Id or Password");
	}
		
	
	
	public ResponseEntity<ResponseStructure<String>> deleteUserById(int id) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		Optional<User> recUser = userDao.findUserById(id);
		
		if( recUser.isPresent()) {
			userDao.deleteUserById(id);
			
			structure.setMessage("User deleted succesfully");
			structure.setData("User Found");
			structure.setStatusCode(HttpStatus.OK.value());
			
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new UserNotFoundException("Cannot delete User as Id is Invalid");
	}
	
	
	
	public String activate(String token) {
		Optional<User> recUser = userDao.findByToken(token);
		
		if (recUser.isEmpty())
			throw new UserNotFoundException("Invalid Token");
		User dbUser = recUser.get();
		dbUser.setStatus("ACTIVE");
		dbUser.setToken(null);
		userDao.saveUser(dbUser);
		return "Your Account has been activated";
	}
	
	
	private User mapToUser(UserRequest userRequest) {
		return User.builder().email(userRequest.getEmail()).name(userRequest.getName()).phone(userRequest.getPhone())
				.gender(userRequest.getGender()).age(userRequest.getAge()).password(userRequest.getPassword()).build();
	}
	
	private UserResponse mapToUserResponse(User user) {
		
		return UserResponse.builder().id(user.getId()).name(user.getName()).phone(user.getPhone())
				.email(user.getEmail()).age(user.getAge()).gender(user.getGender())
				.password(user.getPassword()).build();
	}

}
