package org.jsp.reservationapi.exception;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.exception.ConstraintViolationException;
import org.jsp.reservationapi.dto.ResponseStructure;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ReservationApiExceptionHandler {
	
	
	@ExceptionHandler(AdminNotFoundException.class)
	public ResponseEntity<ResponseStructure<String>> handleANFE(AdminNotFoundException exception) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		structure.setData("Admin Not Found");
		structure.setMessage(exception.getMessage());
		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(structure);
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ResponseStructure<String>> handleUNFE(Exception exception){
		ResponseStructure<String> structure = new ResponseStructure<>();
		structure.setData("User Not FOund");
		structure.setMessage(exception.getMessage());
		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(structure);
	}
	
	@ExceptionHandler(BusNotFoundException.class)
	public ResponseEntity<ResponseStructure<String>> handleBNFE(Exception exception){
		ResponseStructure<String> structure = new ResponseStructure<>();
		structure.setData("Bus Not FOund");
		structure.setMessage(exception.getMessage());
		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(structure);
	}
	
	
	@ExceptionHandler({ConstraintViolationException.class})
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public String handleConstraintViolationException(ConstraintViolationException ex) {
		return ex.getErrorMessage() + " " + ex.getCause();
	}
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String > handleValidationExceptions(MethodArgumentNotValidException ex){
		
		Map<String, String> errors = new HashMap<>();
		List<ObjectError> objectError = ex.getBindingResult().getAllErrors();
		for(ObjectError objectErrors: objectError) {
			
			String fieldName = ((FieldError) objectErrors).getField();
			String errorMessage =objectErrors.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		}
		return errors;
	}
	
	
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	@ExceptionHandler(IllegalStateException.class)
	public ResponseStructure<String> handle(IllegalStateException exception) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		structure.setData("Cannot SingIn");
		structure.setMessage(exception.getMessage());
		structure.setStatusCode(HttpStatus.UNAUTHORIZED.value());
		return structure;
	}
	
	@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseStructure<String> handle(IllegalArgumentException exception) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		structure.setData("Cannot Complete the Action");
		structure.setMessage(exception.getMessage());
		structure.setStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
		return structure;
	}
}
