package co.usa.reto4.reto4.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.reto4.reto4.model.Client;
import co.usa.reto4.reto4.model.Reservations;
import co.usa.reto4.reto4.reportes.ContadorClientes;
import co.usa.reto4.reto4.repository.crud.ReservationsCrudRepository;


@Repository
public class ReservationsRepository {
    
    @Autowired
    private ReservationsCrudRepository reservationsCrudRepository;

    public List<Reservations>getAll(){
        return (List<Reservations>)reservationsCrudRepository.findAll();
    }

    public Optional<Reservations>getReservations(int id){
        return reservationsCrudRepository.findById(id);
    }

    public Reservations save(Reservations reservations){
        return reservationsCrudRepository.save(reservations);
    }

    public void delete(Reservations reservations){
        reservationsCrudRepository.delete(reservations);
    }

    public List<Reservations> ReservacionStatusRepositorio (String status){
        return reservationsCrudRepository.findAllByStatus(status);
    }
    
    public List<Reservations> ReservacionTiempoRepositorio (Date a, Date b){
        return reservationsCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);
    }
    
    public List<ContadorClientes> getClientesRepositorio(){
        List<ContadorClientes> res = new ArrayList<>();
        List<Object[]> report = reservationsCrudRepository.countTotalReservationsByClient();
        for(int i=0; i<report.size(); i++){
            res.add(new ContadorClientes((Long)report.get(i)[1],(Client) report.get(i)[0]));
        }
        return res;
    }
}
