package com.example.gosyippee.controller;

import com.example.gosyippee.model.Message;

public class RealtimeChat {
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@MessageMapping("/message")
	@SendTo("/group/public")
	public Message receiveMessage(@Payload Message message) {
		simpMessagingTemplate.convertAndSend("/group/"+message.getChat().getId().toString(), message);
		return message;
	}
	
}
