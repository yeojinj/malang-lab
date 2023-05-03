package com.c102.malanglab.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.broker.BrokerAvailabilityEvent;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.Objects;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${spring.rabbitmq.host:localhost}")
    private String host;

    @Value("${spring.rabbitmq.virtual-host:/}")
    private String virtualHost;

    @Value("${spring.rabbitmq.stomp-port:61613}")
    private int stompPort;

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
        registry.setPathMatcher(new AntPathMatcher("."));
        registry.setApplicationDestinationPrefixes("/app").
        enableStompBrokerRelay("/queue", "/topic")
                .setRelayHost(host)
                .setVirtualHost(virtualHost)
                .setRelayPort(stompPort)
                .setSystemLogin(systemUserName)
                .setSystemPasscode(systemPassword)
                .setClientLogin(userName)
                .setClientPasscode(password);
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration){
        registration.interceptors(new StompHandler());
    }

    public class StompHandler implements ChannelInterceptor {

        @Override
        public Message<?> preSend(Message<?> message, MessageChannel channel) {
            StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
            if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                // STOMP 연결 됐을 때,
                accessor.setSessionId(accessor.getNativeHeader("Authorization").get(0));
            } else if(StompCommand.DISCONNECT.equals(accessor.getCommand())) {
                // STOMP 연결 종료 시,
            }
            return message;
        }
    }
}
