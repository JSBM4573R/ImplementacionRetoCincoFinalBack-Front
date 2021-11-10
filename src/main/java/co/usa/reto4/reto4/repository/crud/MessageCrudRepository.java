package co.usa.reto4.reto4.repository.crud;

import org.springframework.data.repository.CrudRepository;
import co.usa.reto4.reto4.model.Message;

public interface MessageCrudRepository extends CrudRepository <Message, Integer> {
    
}
