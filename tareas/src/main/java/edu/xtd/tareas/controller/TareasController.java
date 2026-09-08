package edu.xtd.tareas.controller;

import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.xtd.tareas.dto.Tarea;
import jakarta.annotation.PostConstruct;

  // Desarrollador: Jaime Galvez Martinez

@RestController
@RequestMapping("/tarea")
public class TareasController {
	
	// Mapa donde se almacenan las tareas.
    Map<Integer, Tarea> mapaTareas;

    @PostConstruct
    private void iniciarMapaTareas() {

    	// Tareas por defecto
    	System.out.println("Desarrollador: Jaime Galvez Martinez");
        System.out.println("Tareas por defecto");
        System.out.println("Las siguientes tareas se cargan nada mas ejecutar la aplicacion web, pero, se pueden modificar, eliminar etc...");
        
        Tarea tarea0 = new Tarea(0, "Limpiar Arena del Gato", false);
        Tarea tarea1 = new Tarea(1, "Dar Comida al Gato", false);
        Tarea tarea2 = new Tarea(2, "Estudiar", false);
        Tarea tarea3 = new Tarea(3, "Jugar Con el Gato", false);
        Tarea tarea4 = new Tarea(4, "Lavarme los dientes", false);
        Tarea tarea5 = new Tarea(5, "Poner la alarma", false);
        Tarea tarea6 = new Tarea(6, "Dar las buenas noches", false);

        this.mapaTareas = new TreeMap<>();

        this.mapaTareas.put(tarea0.id(), tarea0);
        this.mapaTareas.put(tarea1.id(), tarea1);
        this.mapaTareas.put(tarea2.id(), tarea2);
        this.mapaTareas.put(tarea3.id(), tarea3);
        this.mapaTareas.put(tarea4.id(), tarea4);
        this.mapaTareas.put(tarea5.id(), tarea5);
        this.mapaTareas.put(tarea6.id(), tarea6);
        System.out.println("Tareas por defecto = " + this.mapaTareas);
    }

    // CONSULTAR TODAS
    @GetMapping("")
    public Collection<Tarea> consultarTodas() {
        return this.mapaTareas.values();
    }

    // CONSULTAR UNA
    @GetMapping("/{id}")
    public Tarea obtenerPorId(@PathVariable Integer id) {
        return mapaTareas.get(id);
    }

    // DAR DE ALTA
    @PostMapping("")
    public Tarea darDeAlta(@RequestBody Tarea tarea) {

        int nuevoId = 0;

        if (!mapaTareas.isEmpty()) {
            nuevoId = mapaTareas.keySet().stream()
                    .max(Integer::compareTo)
                    .get() + 1;
        }

        Tarea tareaNueva = new Tarea(
                nuevoId,
                tarea.texto(),
                tarea.completada()
        );

        this.mapaTareas.put(nuevoId, tareaNueva);

        return tareaNueva;
    }

    // DAR DE BAJA
    @DeleteMapping("/{id}")
    public void eliminarTarea(@PathVariable int id) {
        this.mapaTareas.remove(id);
    }

    // MODIFICAR
    @PutMapping("/{id}")
    public Tarea modificar(
            @PathVariable("id") int id,
            @RequestBody Tarea tarea) {

        Tarea tareaModificada = new Tarea(
                id,
                tarea.texto(),
                tarea.completada()
        );

        this.mapaTareas.put(id, tareaModificada);

        return tareaModificada;
    }
}