package com.a304.mozzi.global.filter;

import com.a304.mozzi.global.log.LogService;
import jakarta.servlet.DispatcherType;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoSession;
import org.mockito.internal.framework.DefaultMockitoSession;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

@SpringBootTest
class LogFilterTest {

    @Test
    public void requestWithoutSession() {
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/");
        LogService service = mock(LogService.class);
        LogFilter logFilter = new LogFilter(service);

        request.setDispatcherType(DispatcherType.ERROR);
        logFilter.handleRequest(request);

        request.setDispatcherType(DispatcherType.ERROR);
        logFilter.handleRequest(request);


    }

}