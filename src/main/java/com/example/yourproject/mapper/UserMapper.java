package com.example.yourproject.mapper;

import com.example.yourproject.dto.UserDTO;
import com.example.yourproject.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDTO(User user);
    User toEntity(UserDTO dto);
}
