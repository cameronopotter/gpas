import firebase from 'firebase/compat/app';
import { doc, deleteDoc } from "firebase/firestore";


export function addCustomer(customer){
    firebase.firestore()
    .collection("Customers")
    .add({
        customerName: customer.customerName,
        contractNumber: customer.contractNumber,
        backfillDate:customer.backfillDate,
        concretePourDate:customer.concretePourDate,
        contractDate:customer.contractDate,
        deckLayoutCompleted:customer.deckLayoutCompleted,
        digDate:customer.digDate,
        electricalCompleted:customer.electricalCompleted,
        financeName:customer.financeName,
        linerInstallDate:customer.linerInstallDate,
        middlePaymentCollected:customer.middlePaymentCollected,
        poolLayoutApprovalDate:customer.poolLayoutApprovalDate,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        id:""
    }).then(console.log(customer)).
    catch((error) => console.log(error))
}

export function delCustomer(customer){
    firebase.firestore()
    .collection("Customers")
    .deleteDoc(doc(customer))
    .catch((error) => console.log(error))
}

export async function getCustomers(customersRetreived){

    var customerList = [];

    var snapshot = await firebase.firestore()
    .collection("Customers")
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
        customerList.push(doc.data())
    });

    customersRetreived(customerList);
}