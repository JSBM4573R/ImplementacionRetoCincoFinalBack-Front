package co.usa.reto4.reto4.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import co.usa.reto4.reto4.model.Client;
import co.usa.reto4.reto4.repository.crud.ClientCrudRepository;

@Repository
public class ClientRepository {

    @Autowired
    private ClientCrudRepository clientCrudRepository;

    public List<Client>getAll(){
        return (List<Client>)clientCrudRepository.findAll();
    }

    public Optional<Client>getClient(int id){
        return clientCrudRepository.findById(id);
    }

    public Client save(Client client){
        return clientCrudRepository.save(client);
    }

    public void delete(Client client){
        clientCrudRepository.delete(client);
    }

    
}
