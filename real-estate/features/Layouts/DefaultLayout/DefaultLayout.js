import Footer from "@/features/common/modules/Footer/Footer";
import Navigation from "@/features/common/modules/Navigation/Navigation"; 

const DefaultLayout = ({children}) => {
    return ( 
    <>
        <Navigation />
        {children}
        <Footer />
    </> 
    );
}
 
export default DefaultLayout;