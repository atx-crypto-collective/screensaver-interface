import { useState, useEffect } from 'react';
import { utils } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { db } from '../config/firebase'

interface IProps {
    account: string
}

type AccountData = {
    username?: string
    profileImage?: string
    bannerImage?: string
    description?: string 
    timestamp?: Date
}

function useAccountData({account}: IProps): [boolean, AccountData | undefined] {

    const [accountData, setAccountData] = useState<AccountData | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    // check reports for
    useEffect(() => {
        if (!account) return;
        const unsubscribe = db
          .collection('accounts')
          .doc(account)
          .onSnapshot((doc) => {
            if (!doc.exists) return setLoading(false);

            let accountData: AccountData = {
                username: '',
                profileImage: '',
                bannerImage: '',
                description: '',
                timestamp: new Date
            };
            
            console.log("DOC", doc.data())
            if (!!doc.data().username) {
                accountData.username = doc.data().username
            }
            
            if (!!doc.data().description) {
                accountData.description = doc.data().description
            }

            setAccountData(accountData);

            setLoading(false);
          })
        return () => unsubscribe() // Make sure we un-register Firebase observers when the component unmounts.
      }, [])

  return [loading, accountData];
}


export default useAccountData;