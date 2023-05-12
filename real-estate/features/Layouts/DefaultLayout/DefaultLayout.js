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