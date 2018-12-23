//BB 00 03 00 01 00 04 7E
unsigned char shuchu[8] = {0xbb, 0x00, 0x22, 0x00, 0x00, 0x22, 0x7e};
int comdata[24] = {0};
int cnt[50] = {0};
int Nloop = 0;
int c = 0, n = 0;
long int data[2] = {0};
long int ecp[50][2] = {0};
void setup() {
//  Serial.begin(115200);
   Serial2.begin(115200);
  Serial3.begin(115200);
  Nloop = 0;   
}

void loop() {
  int Check(long int ecp[50][2], int long data[2]);
  if (!Serial3.available() > 0) {
    Serial3.write(shuchu, 8);
  }

  // Serial3.print("BB 00 22 00 00 22 7E");
  //Serial3.write(&shuchu[0],8);
  while (Serial3.available() > 0) {
    //  Serial.println("comdata[")
    comdata[c] = Serial3.read();
    c++;
    if (c == 23) {
      Nloop += 1;
      comdata[c] = Serial3.read();
      c = 0;
      for (int i = 0; i < 2; i++) {
        data[i] = comdata[i + 20];
          //   Serial.println(data[i]);
      }
      if (Check(ecp, data) != -1) {
        cnt[Check(ecp, data)] += 1;
        //     Serial.println("no");
      } else {
          //    Serial.println("ok");
        ecp[n][0] = data[0];
        ecp[n][1] = data[1];
        cnt[n] += 1;
        n++;
      }
    }
    delayMicroseconds(1000);
  }
  c=0;
  // Serial.println("ok");

  if (Nloop > 200||millis()%20000>19000) {
    Nloop = 0;
   // Serial.println(n);
    for (int i = 0; i < n; i++) {
      if(cnt[i]>10){
      Serial.println("----------");
      Serial.println(ecp[i][0]<100?ecp[i][0]*10:ecp[i][0]);
      Serial.println(ecp[i][1]<100?ecp[i][1]*10:ecp[i][1]);
      Serial.println(cnt[i]);
      Serial.println("----------");
      }
    }
      for (int i = 0; i < n; i++) {
      if(cnt[i]>3){
      Serial2.print(ecp[i][0]<100?ecp[i][0]*10:ecp[i][0]);
      Serial2.println(ecp[i][1]<100?ecp[i][1]*10:ecp[i][1]);
      }
    }
    c = 0;
    n = 0;
    memset(data, 0, sizeof(data));
    memset(cnt, 0, sizeof(cnt));
    memset(ecp, 0, sizeof(ecp));
   
  }
}


int Check(long int ecp[50][2], long int data[2]) {   //检查ecp是否出现过
  for (int i = 0; i < 50; i++) {
    if (ecp[i][0] == data[0] && ecp[i][1] == data[1]) {
      return i;
    }
  }
  return -1;
}

