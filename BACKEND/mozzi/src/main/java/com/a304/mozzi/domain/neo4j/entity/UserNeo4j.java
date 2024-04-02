package com.a304.mozzi.domain.neo4j.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;

@Getter
@Setter
@Node
@AllArgsConstructor
public class UserNeo4j {
    @Id
    private final Integer userId;

    @Property
    private Integer worldcup;

}
