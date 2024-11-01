package org.jsp.reservationapi.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.jsp.reservationapi.dao.AdminDao;
import org.jsp.reservationapi.dao.BusDao;
import org.jsp.reservationapi.dto.BusRequest;
import org.jsp.reservationapi.dto.BusResponse;
import org.jsp.reservationapi.dto.ResponseStructure;
import org.jsp.reservationapi.exception.AdminNotFoundException;
import org.jsp.reservationapi.exception.BusNotFoundException;
import org.jsp.reservationapi.model.Admin;
import org.jsp.reservationapi.model.Bus;
import org.jsp.reservationapi.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BusService {

	@Autowired
	private BusDao busDao;
	@Autowired
	private AdminDao adminDao;
	
	@Autowired
    private BusRepository busRepository;

	
	public ResponseEntity<ResponseStructure<Bus>> saveBus(BusRequest busRequest, int admin_id) {
		Optional<Admin> recAdmin = adminDao.findById(admin_id);
		ResponseStructure<Bus> structure = new ResponseStructure<>();
		if (recAdmin.isPresent()) {
			Bus bus = mapToBus(busRequest);
			bus.setAvailableSeats(bus.getNo_of_seats());
			bus.setAdmin(recAdmin.get());
			recAdmin.get().getBuses().add(bus);
			adminDao.saveAdmin(recAdmin.get());
			busDao.saveBus(bus);
			structure.setData(bus);
			structure.setMessage("Bus Added");
			structure.setStatusCode(HttpStatus.CREATED.value());
			return ResponseEntity.status(HttpStatus.CREATED).body(structure);
		}
		throw new AdminNotFoundException("Cannot Add Bus as Admin Id is Invalid");
	}


	
	public ResponseEntity<ResponseStructure<Bus>> updateBus(BusRequest busRequest, int id) {
		ResponseStructure<Bus> structure = new ResponseStructure<>();
		Optional<Bus> recBus = busDao.findById(id);
		if (recBus.isEmpty())
			throw new BusNotFoundException("Cannot update bus, as id is Invalid");
		Bus dbBus = recBus.get();
		dbBus.setBus_number(busRequest.getBus_number());
		dbBus.setDod(busRequest.getDod());
		dbBus.setFrom_loc(busRequest.getFrom_loc());
		dbBus.setTo_loc(busRequest.getTo_loc());
		dbBus.setNo_of_seats(busRequest.getNo_of_seats());
		dbBus.setName(busRequest.getName());
		dbBus.setCostPerSeat(busRequest.getCostPerSeat()); 
		
		dbBus.setAvailableSeats(busRequest.getNo_of_seats());
		dbBus = busDao.saveBus(dbBus);
		structure.setData(dbBus);
		structure.setMessage("Bus updated");
		structure.setStatusCode(HttpStatus.ACCEPTED.value());
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(structure);
	}
	
	public ResponseEntity<ResponseStructure<BusResponse>> findBusById(int id) {
		ResponseStructure<BusResponse> structure = new ResponseStructure<>();
		Optional<Bus> recBus = busDao.findById(id);

		if (recBus.isPresent()) {

			structure.setData(mapToBusResponse(recBus.get()));
			structure.setMessage("Bus Found");
			structure.setStatusCode(HttpStatus.OK.value());

			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new BusNotFoundException("Invalid Bus Id");
	}
	

	public ResponseEntity<ResponseStructure<BusResponse>> findBusByBusNumber(String bus_number) {
		ResponseStructure<BusResponse> structure = new ResponseStructure<>();
		Optional<Bus> recBus = busDao.findBusByBusNumber(bus_number);

		if (recBus.isPresent()) {

			structure.setData(mapToBusResponse(recBus.get()));
			structure.setMessage("Bus Found");
			structure.setStatusCode(HttpStatus.OK.value());

			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new BusNotFoundException("No Bus Found with entered bus number");
	}

	
	
	public ResponseEntity<ResponseStructure<String>> deleteBusById(int id) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		Optional<Bus> recBus = busDao.findById(id);

		if (recBus.isPresent()) {

			busDao.deleteBus(id);

			structure.setMessage("Bus deleted succesfully");
			structure.setData("Bus Found");
			structure.setStatusCode(HttpStatus.OK.value());

			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new BusNotFoundException("Cannot delete Bus as Id is invalid");
	}
	
	
	
	public ResponseEntity<ResponseStructure<List<Bus>>> findAll() {
		ResponseStructure<List<Bus>> structure = new ResponseStructure<>();
		structure.setData(busDao.findAll());
		structure.setMessage("List of All Buses");
		structure.setStatusCode(HttpStatus.OK.value());
		return ResponseEntity.status(HttpStatus.OK).body(structure);
	}
	
	
	public ResponseEntity<ResponseStructure<List<Bus>>> findByAdminId(int admin_id) {
		ResponseStructure<List<Bus>> structure = new ResponseStructure<>();
		List<Bus> buses = busDao.findBusesByAdminId(admin_id);
		if (buses.isEmpty())
			throw new BusNotFoundException("No Buses for entered Admin Id");
		structure.setData(buses);
		structure.setMessage("List of Buses for entered Amdin id");
		structure.setStatusCode(HttpStatus.OK.value());
		return ResponseEntity.status(HttpStatus.OK).body(structure);
	}
	
	
	public ResponseEntity<ResponseStructure<List<Bus>>> findBuses(String from_loc, String to_loc, LocalDate dod) {
        ResponseStructure<List<Bus>> structure = new ResponseStructure<>();
        List<Bus> buses = busRepository.findBuses(from_loc, to_loc, dod);
        if (buses.isEmpty()) {
            throw new BusNotFoundException("No Buses for entered route on this Date");
        }
        structure.setData(buses);
        structure.setMessage("List of Buses for entered route on this Date");
        structure.setStatusCode(HttpStatus.OK.value());
        return ResponseEntity.status(HttpStatus.OK).body(structure);
    }

	
	public Bus mapToBus(BusRequest busRequest) {
	    return Bus.builder()
	            .name(busRequest.getName())
	            .bus_number(busRequest.getBus_number())
	            .dod(busRequest.getDod())
	            .from_loc(busRequest.getFrom_loc())
	            .to_loc(busRequest.getTo_loc())
	            .no_of_seats(busRequest.getNo_of_seats())
	            .availableSeats(busRequest.getNo_of_seats())  
	            .costPerSeat(busRequest.getCostPerSeat())
	            .build();
	}
	

//	private BusResponse mapToBusResponse(Bus bus) {
//		return BusResponse.builder().id(bus.getId()).name(bus.getName()).bus_number(bus.getBus_number())
//				.dod(bus.getDod()).from_loc(bus.getFrom_loc()).to_loc(bus.getTo_loc())
//				.no_of_seats(bus.getNo_of_seats()).build();
//	}
	

    private BusResponse mapToBusResponse(Bus bus) {
        return BusResponse.builder()
                .id(bus.getId())
                .name(bus.getName())
                .bus_number(bus.getBus_number())
                .dod(bus.getDod())
                .from_loc(bus.getFrom_loc())
                .to_loc(bus.getTo_loc())
                .no_of_seats(bus.getNo_of_seats())
                .availableSeats(bus.getAvailableSeats())  
                .costPerSeat(bus.getCostPerSeat())        
                .build();
    }

}
