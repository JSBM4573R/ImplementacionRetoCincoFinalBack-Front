package co.usa.reto4.reto4.repository.crud;

import org.springframework.data.repository.CrudRepository;
import co.usa.reto4.reto4.model.Category;

public interface CategoryCrudRepository extends CrudRepository <Category, Integer> {
    
}
