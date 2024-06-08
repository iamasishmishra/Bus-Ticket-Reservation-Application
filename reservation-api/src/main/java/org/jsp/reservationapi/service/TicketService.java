package org.jsp.reservationapi.service;

import java.util.Optional;

import org.jsp.reservationapi.dao.BusDao;
import org.jsp.reservationapi.dao.TicketDao;
import org.jsp.reservationapi.dao.UserDao;
import org.jsp.reservationapi.dto.TicketResponse;
import org.jsp.reservationapi.exception.BusNotFoundException;
import org.jsp.reservationapi.exception.UserNotFoundException;
import org.jsp.reservationapi.model.Bus;
import org.jsp.reservationapi.model.Ticket;
import org.jsp.reservationapi.model.User;
import org.jsp.reservationapi.util.AccountStatus;
import org.jsp.reservationapi.util.TicketStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
	
	@Autowired
	private TicketDao ticketDao;
	@Autowired
	private BusDao busDao;
	@Autowired
	private UserDao userDao;

	public TicketResponse bookTicket(int userId, int busId, int numberOfSeats) {
		Optional<Bus> recBus = busDao.findById(busId);
		Optional<User> recUser = userDao.findUserById(userId);
		if (recBus.isEmpty())
			throw new BusNotFoundException("Cannot Book Ticket as Bus Id is Invalid");
		if (recUser.isEmpty())
			throw new UserNotFoundException("Cannot Book Ticket as User Id is Invalid");
		User dbUser = recUser.get();
		if (dbUser.getStatus().equals(AccountStatus.IN_ACTIVE.toString()))
			throw new IllegalStateException("Please Activate Your Account, Then book tickets");
		Bus dbBus = recBus.get();
		if (dbBus.getAvailableSeats() < numberOfSeats)
			throw new IllegalArgumentException("Insufficient seats");
		Ticket ticket = new Ticket();
		ticket.setCost(numberOfSeats * dbBus.getCostPerSeat());
		ticket.setStatus(TicketStatus.BOOKED.toString());
		ticket.setBus(dbBus);
		ticket.setUser(dbUser);
		ticket.setNumberOfSeatsBooked(numberOfSeats);
		dbBus.getBookedTickets().add(ticket);
		dbUser.getTickets().add(ticket);
		dbBus.setAvailableSeats(dbBus.getAvailableSeats() - numberOfSeats);
		userDao.saveUser(dbUser);
		busDao.saveBus(dbBus);
		ticket = ticketDao.saveTicket(ticket);
		return mapToTicketResponse(ticket, dbBus, dbUser);
	}

	public TicketResponse mapToTicketResponse(Ticket ticket, Bus bus, User user) {
		TicketResponse ticketResponse = new TicketResponse();
		ticketResponse.setAge(user.getAge());
		ticketResponse.setBusName(bus.getName());
		ticketResponse.setBusNumber(bus.getBus_number());
		ticketResponse.setCost(ticket.getCost());
		ticketResponse.setDateOfBooking(ticket.getDateOfBooking());
		ticketResponse.setDateOfDeparture(bus.getDod());
		ticketResponse.setDestination(bus.getTo_loc());
		ticketResponse.setGender(user.getGender());
		ticketResponse.setId(ticket.getId());
		ticketResponse.setNumberOfSeatsBooked(ticket.getNumberOfSeatsBooked());
		ticketResponse.setPhone(user.getPhone());
		ticketResponse.setSource(bus.getFrom_loc());
		ticketResponse.setStatus(ticket.getStatus());
		ticketResponse.setUsername(user.getName());
		return ticketResponse;

	}

}
