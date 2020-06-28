# creating users
http PUT localhost:5000/api/user addr=0xab33093890cf320Fc name=Naz fullname='Nazariy Va' aboutMe='codea ALL the time'
http PUT localhost:5000/api/user addr=0x1232423caAb3312Fa name=Dima fullname='Dima Iv' aboutMe="best front end developer"
# retrieving all users
http GET localhost:5000/api/user
# creating bounty
http PUT localhost:5000/api/bounty title='Make Tushonka' issuer=0xab33093890cf320Fc price=1000 expiry=123123123 type=contest description='I love tushonka, make me some, please.' shortDescription='just do it' complexity='advanced'
http PUT localhost:5000/api/bounty title='Solve the Black and Scholes Equation' issuer=0x1232423caAb3312Fa price=100000 expiry=123123123 type=contest description='I love BSE, solve it for me, please.' shortDescription='do you know about PDEs?' complexity='advanced'
# editing bounty
# http PUT localhost:5000/api/bounty:
# retrieving all bounties
http GET localhost:5000/api/bounty