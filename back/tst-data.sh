sleep 10

# creating users
http PUT localhost:5000/api/user addr=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE name=Naz fullname='Nazariy Va' about_me='codes ALL the time'
http PUT localhost:5000/api/user addr=0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA name=Dima fullname='Dima Iv' about_me="best front end developer"

# creating bounty
http PUT localhost:5000/api/bounty title='Make Tushonka' issuer=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE price=1000 expiry=1593425683 type='contest' desc='I love tushonka, make me some, please.' short_desc='just do it' complexity='advanced'
http PUT localhost:5000/api/bounty title='Solve the Black and Scholes Equation' issuer=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE price=100000 expiry=1693455693 type='contest' desc='I love BSE, solve it for me, please.' short_desc='do you know about PDEs?' complexity='advanced'

# editing bounty
http PUT localhost:5000/api/bounty/1 title='Make Many Tushonkas' tags='go,react'
http PUT localhost:5000/api/bounty/2 tags='react'

# both users start work on bounty tushonka
# ! authorization in the future
http POST localhost:5000/api/bounty/1/start_work addr=0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE
http POST localhost:5000/api/bounty/1/start_work addr=0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA
http POST localhost:5000/api/bounty/2/start_work addr=0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA

# submitting sample
http POST localhost:5000/api/bounty/2/submit_sample addr=0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA ipfs_url=http://sfkdsjfi838383.com