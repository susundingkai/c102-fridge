#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
String comdata = "";
String ssid = "ss"; // 需要连接的wifi热点名称
String password = "ssdk1234"; // 需要连接的wifi热点密码
/* 上传数据到服务器。
  device为设备号，sensor为传感器号，data为上传数据点的值
  这里默认上传到最新的数据点上，需要上传到特定点上就得在post内容中单独加入时间戳
*/
void uploadYeelinkData(String device, String sensor, String data) {
  HTTPClient http;
  const String apiAddress = "/v1.1/device/" + device + "/sensor/" + sensor + "/datapoints";
  http.begin("site19.club", 9090, "/esp");
  int httpCode =  http.POST("{\"Ecp\":[" + data + "]}");
  Serial.print("code:");
  Serial.println(httpCode);
  if (httpCode == 200) { // 访问成功，取得返回参数
    String payload = http.getString();
  //  Serial.println(payload);
  } else { // 访问不成功，打印原因
    String payload = http.getString();
    Serial.print("context:");
    Serial.println(payload);
  }
}
void setup() {

  Serial.begin (115200);
  int connectCount = 0;
  WiFi.begin ( ssid.c_str(), password.c_str() );
  while ( WiFi.status() != WL_CONNECTED ) {
    delay ( 1000 );
    Serial.print ( "." );
    if (connectCount > 30) {
      Serial.println( "Connect fail!" );
      break;
    }
    connectCount += 1;
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println ( "" );
    Serial.print ( "Connected to " );
    Serial.println ( ssid );
    Serial.print ( "IP address: " );
    Serial.println ( WiFi.localIP() );
    connectCount = 0;
  }
  //readYeelinkData("8938", "28887"); // 读取数据点测试
  // uploadYeelinkData("8938", "28887", "1"); // 写入数据点测试


}

void loop() {
  ESP.wdtEnable(15);
  comdata = "";
  String data = "";
  String ecp[50] = {""};
  while (Serial.available()) {
    comdata += Serial.read();
    delay(2);
  }
  for (int i = 0; comdata.length() > 0; i++) {
      Serial.println(comdata);
    ecp[i] = comdata.substring(0, 12);
    comdata = comdata.substring(16);
  }
  for (int j = 0; ecp[j].length() > 0; j++) {
     Serial.println(ecp[j]);
    data += '"';
    data += ecp[j];
    data += '"';
    if(ecp[j+1].length() > 0)
    data += ",";
  }
  if (data.length() > 0) {
    Serial.println(data);
    uploadYeelinkData("8938", "28887", data);
  }
  delay(2);
  ESP.wdtFeed();
}
