FROM openjdk:17-alpine
VOLUME /tmp
COPY build/libs/MalangLab-0.0.1-SNAPSHOT.jar MalangService.jar
ENTRYPOINT ["java", "-jar", "MalangService.jar", "--spring.profiles.active=prod"]