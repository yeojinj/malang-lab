package com.c102.malanglab.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.broker.BrokerAvailabilityEvent;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompBrokerRelayMessageHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${spring.rabbitmq.host:localhost}")
    private String host;

    @Value("${spring.rabbitmq.virtual-host:/}")
    private String virtualHost;

    @Value("${spring.rabbitmq.port:61613}")
    private int port;

    @Value("${spring.rabbitmq.username:guest}")
    private String userName;

    @Value("${spring.rabbitmq.password:guest}")
    private String password;

    @Value("${spring.rabbitmq.system.username:guest}")
    private String systemUserName;

    @Value("${spring.rabbitmq.system.password:guest}")
    private String systemPassword;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("*");
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app").
        enableStompBrokerRelay("/queue", "/topic")
                .setRelayHost(host)
                .setVirtualHost(virtualHost)
                .setRelayPort(port)
                .setSystemLogin(systemUserName)
                .setSystemPasscode(systemPassword)
                .setClientLogin(userName)
                .setClientPasscode(password);
    }


    @Bean
    public ApplicationListener<BrokerAvailabilityEvent> brokerAvailabilityEventApplicationListener() {
        return new BrokerAvailabilityEventListener();
    }

    public class BrokerAvailabilityEventListener implements ApplicationListener<BrokerAvailabilityEvent> {
        @Override
        public void onApplicationEvent(BrokerAvailabilityEvent brokerAvailabilityEvent) {
            System.out.println(brokerAvailabilityEvent.isBrokerAvailable());
        }
    }
}
