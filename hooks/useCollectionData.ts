import { useState, useEffect } from 'react';
import { db } from '../config/firebase'
import { Collection } from '../types'

interface IProps {
    account: string
}

function useCollectionData({account}: IProps): [boolean, Collection | undefined] {

    const [collectionData, setCollectionData] = useState<Collection | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    // check reports for
    useEffect(() => {
        if (!account) return;
        const unsubscribe = db
          .collection('collections')
          .doc(account)
          .onSnapshot((doc) => {
            if (!doc.exists) return setLoading(false);

            let collectionData: Collection = {
                title: '',
                address: '',
                ids: [],
                description: '',
                timestamp: new Date
            };
            
            console.log("DOC", doc.data())
            if (!!doc.data().username) {
                collectionData.title = doc.data().title
            }
            
            if (!!doc.data().description) {
                collectionData.description = doc.data().description
            }

            setCollectionData(collectionData);

            setLoading(false);
          })
        return () => unsubscribe() // Make sure we un-register Firebase observers when the component unmounts.
      }, [])

  return [loading, collectionData];
}


export default useCollectionData;