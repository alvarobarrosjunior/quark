package org.example.quarktask.service;

import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;

public interface KeycloakService {

    public List<UserRepresentation> getUsers();

}
