import { useMutation } from "@tanstack/react-query";
import "./Profile.scss";
import { api, version } from "../../components/utils/api";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffect } from "react";
import AddressSelector from "../../components/AddressSelector/AddressSelector";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import OrdersElement from "../../components/OrdersElement/OrdersElement";

const Profile = () => {
  const authHeader = useAuthHeader();

  const {
    mutate: getUserInfo,
    data,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${api}/v${version}/User`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      if (!response.ok) {
        throw new Error("Failed get user.");
      }

      return response.json();
    },
    onSuccess: (data) => {
      //
    },
    onError: (error) => {
      console.error("Error getting user data.:", error);
    },
  });

  const {
    mutate: getOrders,
    data: getOrdersData,
    isPending: getOrdersIsPending,
    error: getOrdersError,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${api}/v${version}/Order/user-orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      if (!response.ok) {
        throw new Error("Failed get user.");
      }

      return response.json();
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error getting user data.:", error);
    },
  });

  useEffect(() => {
    getUserInfo();
    getOrders();
  }, []);

  return (
    <div className="profilesection-container">
      <div className="profilesection-container-inner">
        <div className="profilesection-container-inner-top">
          <DashboardContainer header={"User Information"}>
            <div className="profilesection-container-inner-top-user">
              <span className="profilesection-container-inner-top-user-text">
                {data?.firstName} {data?.lastName}
              </span>
              <span className="profilesection-container-inner-top-user-text">
                {data?.email}
              </span>
            </div>
          </DashboardContainer>
          <DashboardContainer header={"User addresses"}>
            <div className="profilesection-container-inner-top-addresses">
              <AddressSelector
                onAddressRemove={getUserInfo}
                addressData={data?.address}
                profile
              />
            </div>
          </DashboardContainer>
        </div>
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <DashboardContainer header={"Previous orders"} style={{ padding: 0 }}>
            <div className="profilesection-container-inner-orders">
              <div className="profilesection-container-inner-orders-header profilesection-container-inner-orders-grid">
                <span>Products</span>
                <span>Order ID</span>
                <span>Date</span>
                <span>Total</span>
                <span>Status</span>
              </div>

              {getOrdersData?.map((order, i) => (
                <OrdersElement data={order} key={i} />
              ))}
            </div>
          </DashboardContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;
