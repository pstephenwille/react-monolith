package swille.web.rest.gapi;

import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.LowLevelHttpRequest;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.LowLevelHttpResponse;
import com.google.api.client.http.javanet.NetHttpTransport;

import java.io.IOException;

public class HttpTransporter extends HttpTransport {

    private HttpRequestFactory requestFactory = new NetHttpTransport().createRequestFactory();

    public HttpTransporter(String method, String url) throws IOException {
        this.buildRequest(method, url);
    }
    protected LowLevelHttpRequest buildRequest(String method, String url) throws IOException {
        HttpRequest request = requestFactory.buildGetRequest(new GenericUrl(url));

        return new LowLevelHttpRequest() {
            @Override public void addHeader(String name, String value) throws IOException {

            }

            @Override public LowLevelHttpResponse execute() throws IOException {
                return null;
            }
        };
    }

}
