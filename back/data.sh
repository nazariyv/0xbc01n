sleep 10

# creating users
http --ignore-stdin PUT localhost:8080/api/user addr=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE name=Naz fullname='Nazariy Va' about_me='codes ALL the time'
http --ignore-stdin PUT localhost:8080/api/user addr=0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA name=Dima fullname='Dima Iv' about_me="best front end developer"
http --ignore-stdin PUT localhost:8080/api/user addr=0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8 name=Vasia fullname='Vasia' nickname="Pupkin" about_me="best front end developer"
http --ignore-stdin PUT localhost:8080/api/user addr=0xe49b55119D6a74783CA23482e8dc5a3DE21085f5 name=Petia fullname='Petka' about_me="I am boring"
http --ignore-stdin PUT localhost:8080/api/user addr=0x875267102b1Aee1E0a53d8ABe99D978392425B35 name=Pypkin fullname='Pypochkin' about_me="I love gaming"
http --ignore-stdin PUT localhost:8080/api/user addr=0x00C37502Be36F1f2E8a87f3024B71D7388f0B0E1 name=Misha fullname='Misha Vasiochkin' about_me="why am I here"
http --ignore-stdin PUT localhost:8080/api/user addr=0x9E6033eDD6cE498cc82051D78eF8de7C509243e7 name=Ninka fullname='Ninka Dlinnaja' about_me="I love bugs"

# creating bounty
http --ignore-stdin PUT localhost:8080/api/bounty title='Make Tushonka' issuer=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE price=1000 expiry=1593425683 type='contest' desc='I love tushonka, make me some, please. For this task, you will need to scrape the European recipes around the web' short_desc='Please find modern European cuisine recipes' complexity='advanced'
http --ignore-stdin PUT localhost:8080/api/bounty title='Solve the Black and Scholes Equation' issuer=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE price=100000 expiry=1693455693 type='traditional' desc='I love BSE, solve it for me, please.' short_desc='do you know about PDEs?' complexity='advanced'
http --ignore-stdin PUT localhost:8080/api/bounty title='Data Bounty Platform For Ocean Protocol' issuer=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE price=14000 expiry=1693455693 type='cooperative' desc='In this task we ask you to provide with an implementation of the data bounty platform for Ocean Protocol' short_desc='Create a data bounty platform for Ocean' complexity='intermediate'
http --ignore-stdin PUT localhost:8080/api/bounty title='Homomorphic Encryption of Hedge Fund Data' issuer=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE price=21500 expiry=1693455693 type='contest' desc='If you implement this, it will enable dozens of data scientists around the world to run the algorithms on our data' short_desc='We need you to implement homomorphic encryption of time-series data' complexity='beginner'
http --ignore-stdin PUT localhost:8080/api/bounty title='News Trading Neural Network' issuer=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE price=33000 expiry=1693455693 type='traditional' desc='We are looking for a bidirectional GRU NN with an attention layer so that we can effectively trade the Chinese stocks. Thank you' short_desc='GRU with attention layer NN' complexity='beginner'
http --ignore-stdin PUT localhost:8080/api/bounty title='Thermodynamic Fluid Simulation' issuer=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE price=40000 expiry=1693455693 type='cooperative' desc='Our numerical computation skills arent top notch, please help us to numerically simulate thermodynamic fluids' short_desc='Do you know numerical methods? Then this task is for you' complexity='beginner'

# editing bounty
http --ignore-stdin PUT localhost:8080/api/bounty/2 tags='react,nextjs'  # if you do not supply list will give 500 right now

# both users start work on bounty tushonka
# ! authorization in the future
http --ignore-stdin POST localhost:8080/api/bounty/1/start_work addr=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE
http --ignore-stdin POST localhost:8080/api/bounty/1/start_work addr=0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA
http --ignore-stdin POST localhost:8080/api/bounty/2/start_work addr=0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA
http --ignore-stdin POST localhost:8080/api/bounty/2/start_work addr=0x9E6033eDD6cE498cc82051D78eF8de7C509243e7
http --ignore-stdin POST localhost:8080/api/bounty/3/start_work addr=0x00C37502Be36F1f2E8a87f3024B71D7388f0B0E1
http --ignore-stdin POST localhost:8080/api/bounty/3/start_work addr=0xe49b55119D6a74783CA23482e8dc5a3DE21085f5
http --ignore-stdin POST localhost:8080/api/bounty/4/start_work addr=0xe49b55119D6a74783CA23482e8dc5a3DE21085f5
http --ignore-stdin POST localhost:8080/api/bounty/4/start_work addr=0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8
http --ignore-stdin POST localhost:8080/api/bounty/5/start_work addr=0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8
http --ignore-stdin POST localhost:8080/api/bounty/5/start_work addr=0x00C37502Be36F1f2E8a87f3024B71D7388f0B0E1
http --ignore-stdin POST localhost:8080/api/bounty/6/start_work addr=0x875267102b1Aee1E0a53d8ABe99D978392425B35
