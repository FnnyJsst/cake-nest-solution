import styled from "styled-components"
import { theme } from "../../../../../../theme/index"
import { GiCupcake } from "react-icons/gi";
import { FaCamera } from "react-icons/fa";
import { MdEuro } from "react-icons/md";
import { useState } from "react";
import { replaceFrenchCommaWithDot } from "../../../../../../utils/maths";
import { useMenu } from "../../../../../../context/MenuContext";
import { toast } from "react-toastify"
import ToastAddForm from "./ToastAddForm";


export default function AdminForm() {
    const { setMenu } = useMenu();
    const [selectedImage, setSelectedImage] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const displayToastNotification = () => {
        toast.info("Ajouté avec succès !", {
            theme: "dark",
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
    }

    const handleNameChange = (e) => {
        setProductName(e.target.value);
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePriceChange = (e) => {
        const price = e.target.value;
        if (!price) {
            setProductPrice("0.00");
        }
        const priceDot = replaceFrenchCommaWithDot(price)
        setProductPrice(priceDot);
    };

    const handleFormSubmit = (e) => {
        handleSubmit(e);
        displayToastNotification();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Math.random(), 
            title: productName,
            imageSource: selectedImage || "/images/cupcake-item.png",
            price: productPrice
        };
        setMenu((prevMenu) => [...prevMenu, newProduct]);
    }
    return (
       
        <AdminFormStyled>
         {selectedImage ? <img src={selectedImage} /> : <img src="/images/cupcake-item.png" alt="cupcake" />}
            <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <GiCupcake className="icon" />
                    <input 
                        type="text" 
                        placeholder="Nom du produit" 
                        value={productName} 
                        onChange={handleNameChange}/>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="imageUpload" className="icon">
                        <FaCamera />
                    </label>
                    <input 
                        className="inputImage" 
                        id="imageUpload" 
                        type="file" 
                        accept="image/*"
                        onChange= {handleImageChange} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MdEuro className="icon" />
                    <input 
                        type="text" 
                        placeholder="Prix" 
                        value={productPrice} 
                        onChange={handlePriceChange} />
                </div>
                <button type="submit">Ajouter un nouveau produit</button>
            </form>
        </AdminFormStyled>
    )
  }

const AdminFormStyled = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 4vh;
    
    form {
        display: flex;
        flex-direction: column;
    }

    img {
        height: 17vh;
    }
    
    input {
        border: none;
        background-color: #EBEDEF;
        margin: 8px 0;
        height: 5vh;
        width: 45vh;
        border-radius: 5px;  
        font: "Open Sans", sans-serif;
        font-size: ${theme.fonts.size.XS};
        padding-left: 30px;
    }

    .icon { 
        position: absolute;
        margin-left: 10px;
        color: ${theme.colors.greyDark};
    }
    
    button {
        border: none;
        background-color: ${theme.colors.success};
        color: white;
        height: 5vh;
        width: 30vh;
        border-radius: 5px;
    }`