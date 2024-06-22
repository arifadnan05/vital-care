import { Helmet } from 'react-helmet-async'
import HomeCategory from '../HomeCategory/HomeCategory'
import Banner from './Banner/Banner'
import Discount from './Dicount/Discount'
import FrequentlyAsk from './FrequentlyAsk/FrequentlyAsk'
import NewsLetter from './NewsLetter/NewsLetter'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <div>
        <div>
          <div className="divider text-4xl mt-28">OUR CATEGORY</div>
          <p className="text-center text-lg mb-28 mt-10">Learn about wellness practices and lifestyle choices to optimize your health outcomes.</p>
          <div>
            <HomeCategory></HomeCategory>

          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="divider text-4xl mt-28">DISCOUNTED PRODUCT</div>
          <p className="text-center text-lg mb-28 mt-10">Grab yours now</p>
          <div>
            <Discount></Discount>
          </div>
        </div>

      </div>
      <div>
        <div className="divider text-4xl my-28">FREQUENTLY ASKED QUESTIONS</div>

        <div>
          <FrequentlyAsk></FrequentlyAsk>
        </div>
      </div>
      <div>
        <div className="divider text-4xl my-28">SUBSCRIBE</div>
        <NewsLetter></NewsLetter>
      </div>
    </div>
  )
}

export default Home
