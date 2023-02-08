import firebase from 'firebase/compat/app';
import { doc, deleteDoc } from "firebase/firestore";



export function addForm(form){
    firebase.firestore()
    .collection("ChangeOrderForms")
    .add({
        customerName:form.customerName,
        currentBalance:form.currentBalance,
        stumpRemoval:form.stumpRemoval,
        gravel:form.gravel,
        dirtRemoval:form.dirtRemoval,
        concretePumpCharge:form.concretePumpCharge,
        fillDirt:form.fillDirt,
        deletions:form.deletions,
        misc:form.misc,
        totalAdjustedAmount:form.totalAdjustedAmount,
        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        id:""
    }).then(console.log(form)).
    catch((error) => console.log(error))
}

export function delForm(form){
    firebase.firestore()
    .collection("ChangeOrderForms")
    .deleteDoc(doc(form))
    .catch((error) => console.log(error))
}

export async function getForms(formsRetreived){

    var formList = [];

    var snapshot = await firebase.firestore()
    .collection("ChangeOrderForms")
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
        formList.push(doc.data())
    });

    formsRetreived(formList);
}



export function addCustomer(customer){
    firebase.firestore()
    .collection("Customers")
    .add({
        customerName: customer.customerName,
        contractNumber: customer.contractNumber,
        address: customer.address,
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
