package co.usa.reto4.reto4.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.usa.reto4.reto4.model.Category;
import co.usa.reto4.reto4.repository.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category>getAll(){
        return categoryRepository.getAll();
    }

    public Optional<Category>getCategory(int id){
        return categoryRepository.getCategory(id);
    }

    public Category save(Category category){
        if (category.getId()==null) {
            return categoryRepository.save(category);
        } else {
            Optional<Category> consulta=categoryRepository.getCategory(category.getId());
            if (consulta.isEmpty()){
                return categoryRepository.save(category);
            } else {
                return category;
            }
        }
    }

    public Category update(Category category){
        if (category.getId()!=null){
            Optional<Category> consulta=categoryRepository.getCategory(category.getId());
            if (!consulta.isEmpty()){
                if (category.getName()!=null){
                    consulta.get().setName(category.getName());
                }
                if (category.getDescription()!=null){
                    consulta.get().setDescription(category.getDescription());
                }
                return categoryRepository.save(consulta.get());
            }
        }
        return category;
    }

    

    public boolean deleteCategory(int id){
        Optional<Category> consulta=categoryRepository.getCategory(id);
        if (!consulta.isEmpty()) {
            categoryRepository.delete(consulta.get());
            return true;
        }
        return false;
    }
}
