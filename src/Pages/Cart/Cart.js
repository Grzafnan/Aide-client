import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css'
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthProvider/Authprovider';
const Cart = () => {
  const { user, loading, setLoading } = useContext(AuthContext)
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_API_URL}/cart?uid=${user?.uid}`)
      .then(res => {
        setCarts(res?.data?.data)
        setLoading(false)
      })
  }, [user?.uid, setLoading])

  console.log(carts);

  if (loading) {
    return <><h1>Loading...</h1></>
  }

  return (
    <section className={`${styles.section} ${styles.cartWrapper}`}>
      <div className={styles.container}>
        <div className={styles.window}>
          <div className={styles.orderInfo}>
            <div className={styles.orderInfoContent}>
              <h2 className={styles.oderInfoTitle}>Order Summary</h2>

              {
                carts?.map(cart => (
                  <div>
                    <div className={styles.line}></div>
                    <table className={styles.orderTable}>
                      <tbody>
                        <tr>
                          <td><img src={cart?.image} alt='' className={styles.fullWidth} />
                          </td>
                          <td>
                            <br /> <span className={styles.thin}>{cart?.name}</span>
                            <br /> Quantity: {cart?.quantity} <br /> <span className={`${styles.thin} ${styles.small}`}> Total: ${cart?.price * cart?.quantity}
                              <br /><br />
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className={styles.price}>${cart?.price}</div>
                          </td>
                        </tr>
                      </tbody>

                    </table>
                  </div>

                ))
              }

              <div className={styles.line}></div>
              <div className={styles.total}>
                <span style={{ float: "left" }}>
                  <div className={`${styles.thin} ${styles.dense}`}>Discount 10%</div>
                  <div className={`${styles.thin} ${styles.dense}`}>Delivery</div>
                  TOTAL
                </span>
                <span style={{ float: "right", textAlign: "right" }}>
                  <div className={`${styles.thin} ${styles.dense}`}>$68.75</div>
                  <div className={`${styles.thin} ${styles.dense}`}>$4.95</div>
                  $ {carts?.reduce(
                    (acc, item) => acc + (Number(item?.price) * Number(item?.quantity) * ((100 - 10) / 100)),
                    0
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.creditInfo}>
            <div className={styles.creditInfoContent}>
              <table className={styles.halfInputTable}>
                <tr>
                  <td>Please select your card: </td>
                  <td>
                    <div className={styles.dropdown} id='card-dropdown'>
                      <div className={styles.dropdownBtn} id={styles.currentCard}>Visa</div>
                      <div className={styles.dropdownSelect}>
                        <ul>
                          <li>Master Card</li>
                          <li>American Express</li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              <img src='https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png' alt='' height='80' className={styles.creditCardImage} id='credit-card-image' />
              Card Number
              <input className={styles.inputField}></input>
              Card Holder
              <input className={styles.inputField}></input>
              <table className='half-input-table'>
                <tr>
                  <td> Expires
                    <input className={styles.inputField}></input>
                  </td>
                  <td>CVC
                    <input className={styles.inputField}></input>
                  </td>
                </tr>
              </table>
              <button className={styles.payBtn}>Checkout</button>
            </div>
          </div>
        </div>
      </div>

    </section >
  );
};

export default Cart;