package co.usa.reto4.reto4.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.usa.reto4.reto4.model.Audience;
import co.usa.reto4.reto4.repository.AudienceRepository;

@Service
public class AudienceService {
    
    @Autowired
    private AudienceRepository audienceRepository;

    public List<Audience>getAll(){
        return audienceRepository.getAll();
    }

    public Optional<Audience>getAudience(int id){
        return audienceRepository.getAudience(id);
    }

    public Audience save(Audience audience){
        if (audience.getId()==null) {
            return audienceRepository.save(audience);
        } else {
            Optional<Audience> consulta=audienceRepository.getAudience(audience.getId());
            if (consulta.isEmpty()) {
                return audienceRepository.save(audience);
            } else {
                return audience;
            }
        }
    }

    public Audience update(Audience audience){
        if (audience.getId()!=null){
            Optional<Audience> consulta=audienceRepository.getAudience(audience.getId());
            if (!consulta.isEmpty()){
                if (audience.getName()!=null) {
                    consulta.get().setName(audience.getName());
                }
                if (audience.getOwner()!=null) {
                    consulta.get().setOwner(audience.getOwner());
                }
                if (audience.getCapacity()!=null) {
                    consulta.get().setCapacity(audience.getCapacity());
                }
                if (audience.getDescription()!=null) {
                    consulta.get().setDescription(audience.getDescription());
                }
                return audienceRepository.save(consulta.get());
            }
        }
        return audience;
    }

    public boolean deleteAudience(int id){
        Optional<Audience> consulta=audienceRepository.getAudience(id);
        if (!consulta.isEmpty()){
            audienceRepository.delete(consulta.get());
            return true;
        }
        return false;
    }

}
