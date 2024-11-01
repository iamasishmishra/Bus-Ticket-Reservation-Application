package org.jsp.reservationapi.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class BusRequest {
	private int id;
	
	@NotBlank(message = "Name is mandatory")
	private String name;
	
	@NotBlank(message = "Bus Number is mandatory")
	private String bus_number;
	
	private int no_of_seats;
	
	private LocalDate dod;
	
	@NotBlank(message = "From Location is mandatory")
	private String from_loc;
	
	@NotBlank(message = "To Location is mandatory")
	private String to_loc;
	
	private double costPerSeat;
}
