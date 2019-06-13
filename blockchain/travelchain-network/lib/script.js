/**
 * Book a route
 * @param {org.travelchain.network.BookRoute} tx - the route to be booked
 * @transaction
 */

async function bookRoute(tx) {
  /* create booking instance */
  const factory = getFactory();
  const booking = factory.newResource('org.travelchain.network', 'Booking', tx.bookingId);
  booking.discount = tx.discount;
  booking.status = 'AUCTION';
  booking.route = factory.newRelationship('org.travelchain.network', 'Route', tx.route.routeId);
  booking.owner = factory.newRelationship('org.travelchain.network', 'User', tx.owner.userId);
  
  /* calculate partial payment and block coins */
  /**
   * Discount PartToPay
   * 10%	  90%
   * 5%		  75%
   * 3%		  50%
   * 1%		  25%
   */
  const discount = tx.discount;
  let paymentPercent;
  if (discount === 10) {
    paymentPercent = 90;
  } else if (discount === 5) {
    paymentPercent = 75;
  } else if (discount === 3) {
    paymentPercent = 50;
  } else if (discount === 1) {
    paymentPercent = 25;
  } else {
    throw new Error('Discount not exist');
  }
  
  booking.bookedCoins = tx.route.price * paymentPercent / 100;
  
  /* block coins */
  
  if (tx.owner.travelCoins < booking.bookedCoins) {
    throw new Error('User has not enough coins for booking');
  }
  tx.owner.travelCoins -= booking.bookedCoins;
  
  
  const bookingRegistry = await getAssetRegistry('org.travelchain.network.Booking');
  await bookingRegistry.add(booking);
  
  const userRegistry = await getParticipantRegistry('org.travelchain.network.User');
  await userRegistry.update(tx.owner);
}

/**
 * Like a route
 * @param {org.travelchain.network.LikeRoute} tx - the route to be liked
 * @transaction
 */
async function likeRoute(tx) {
  /* create like instance */
  const factory = getFactory();
  const like = factory.newResource('org.travelchain.network', 'Like', tx.likeId);
  like.route = factory.newRelationship('org.travelchain.network', 'Route', tx.route.routeId);
  like.user = factory.newRelationship('org.travelchain.network', 'User', tx.user.userId);
  
  /* add like to route */
  const likeRef = factory.newRelationship('org.travelchain.network', 'Like', tx.likeId);
  if (typeof tx.route.likes == 'undefined') {
    tx.route.likes = new Array();
    tx.route.likes[0] = likeRef;
  } 
  else {
    tx.route.likes.push(likeRef);
  }
  
  /* transfer coins */
  const costOfLike = 0.01;
  if (tx.user.travelCoins < costOfLike) {
    throw new Error('User has not enough coins for Like');
  }
  tx.user.travelCoins -= costOfLike;  
  tx.route.creator.travelCoins += costOfLike;  
  
  const likeRegistry = await getAssetRegistry('org.travelchain.network.Like');
  await likeRegistry.add(like);
  
  const routeRegistry = await getAssetRegistry('org.travelchain.network.Route');
  await routeRegistry.update(tx.route);
  
  const userRegistry = await getParticipantRegistry('org.travelchain.network.User');
  await userRegistry.update(tx.user);
  await userRegistry.update(tx.route.creator);
  
  /* check if Route has enough like to move to the Testing Price phase */
  const RATING_LIMIT = 100;
  if (tx.route.likes.length > RATING_LIMIT) {
    tx.route.status = 'PRICE_TESTING';
  	await routeRegistry.update(tx.route);
  }
}

/**
 * Bet for a route element in testing phase
 * @param {org.travelchain.network.BetTestPricingRouteElement} tx - the bet to be added to route element
 * @transaction
 */
async function betTestPricingRouteElement(tx) {
  /* create Bet instance */
  const factory = getFactory();
  const bet = factory.newResource('org.travelchain.network', 'Bet', tx.betId);
  bet.price = tx.price;
  bet.route = factory.newRelationship('org.travelchain.network', 'Route', tx.route.routeId);
  bet.routeElement = factory.newRelationship('org.travelchain.network', 'RouteElement', tx.routeElement.routeElementId);
  bet.executor = factory.newRelationship('org.travelchain.network', 'Executor', tx.executor.executorId);
  
  /* add bet to executor instance */
  const betRef = factory.newRelationship('org.travelchain.network', 'Bet', tx.betId);
  if (typeof tx.executor.bets == 'undefined') {
    tx.executor.bets = new Array();
    tx.executor.bets[0] = betRef;
  } 
  else {
    tx.executor.bets.push(betRef);
  }
  
  const betRegistry = await getAssetRegistry('org.travelchain.network.Bet');
  await betRegistry.add(bet);
  
  const executorRegistry = await getParticipantRegistry('org.travelchain.network.Executor');
  await executorRegistry.update(tx.executor);
}

/**
 * Bet for a route element
 * @param {org.travelchain.network.BetRouteElement} tx - the bet to be added to route element
 * @transaction
 */
async function betRouteElement(tx) {
  if (tx.price > tx.routeElement.maxPrice) {
    throw new Error('Invalid price');
  }
  
  /* create Bet instance */
  const factory = getFactory();
  const bet = factory.newResource('org.travelchain.network', 'Bet', tx.betId);
  bet.price = tx.price;
  bet.booking = factory.newRelationship('org.travelchain.network', 'Booking', tx.booking.bookingId);
  bet.route = factory.newRelationship('org.travelchain.network', 'Route', tx.route.routeId);
  bet.routeElement = factory.newRelationship('org.travelchain.network', 'RouteElement', tx.routeElement.routeElementId);
  bet.executor = factory.newRelationship('org.travelchain.network', 'Executor', tx.executor.executorId);
  
  /* add bet to executor instance */
  const betRef = factory.newRelationship('org.travelchain.network', 'Bet', tx.betId);
  if (typeof tx.executor.bets == 'undefined') {
    tx.executor.bets = new Array();
    tx.executor.bets[0] = betRef;
  } 
  else {
    tx.executor.bets.push(betRef);
  }
  
  const betRegistry = await getAssetRegistry('org.travelchain.network.Bet');
  await betRegistry.add(bet);
  
  const executorRegistry = await getParticipantRegistry('org.travelchain.network.Executor');
  await executorRegistry.update(tx.executor);
}

/**
 * Finish auction for a route to test pricing
 * @param {org.travelchain.network.FinishTestPricingAuction} tx - the route auction to be finished
 * @transaction
 */
async function finishTestPricingAuction(tx) {
  const GAP_FOR_EXUCTING_COSTS = 1.2;
  /* costs for route creator 1% and referal 1% */
  const ADDITIONAL_COSTS = 1.01 * 1.01;
  
  const betRegistry = await getAssetRegistry('org.travelchain.network.Bet');
  let price = 0;
  for (let routeElement of tx.route.routeElements) {
    const bets = (await betRegistry.getAll())
    	.filter(bet => bet.route.$identifier === tx.route.routeId && bet.routeElement.$identifier === routeElement.routeElementId)
    	.map(bet => bet.price);
    if (bets.length === 0) {
      throw new Error(routeElement.title + ' has no bets');
    }
    
    /* add roylty costs */
    
    let fixedContentCost = 0;
    let percContentCost = 1;
    routeElement.usedContents
      .forEach(content => {
      	if (content.royaltyPrice) {
      		fixedContentCost += content.royaltyPrice
        }
      	if (content.royaltyPrice) {
      		percContentCost *= (1 + content.royaltyPercent / 100);
        }
      });
    
    const elementPrice = (Math.min(...bets) * GAP_FOR_EXUCTING_COSTS + fixedContentCost) * percContentCost;
    routeElement.maxPrice = elementPrice;
    price += elementPrice;
  }
  
  tx.route.price = price * ADDITIONAL_COSTS;
  tx.route.status = 'SHORT_LIST';
  
  const routeRegistry = await getAssetRegistry('org.travelchain.network.Route');
  await routeRegistry.update(tx.route);
  
  const routeElementRegistry = await getAssetRegistry('org.travelchain.network.RouteElement');
  for (let routeElement of tx.route.routeElements) {
    await routeElementRegistry.update(routeElement);
  }
}

/**
 * Finish booking auction for a route
 * @param {org.travelchain.network.FinishBookingAuction} tx - the booking auction to be finished
 * @transaction
 */
async function finishBookingAuction(tx) {
  const factory = getFactory();
  
  /* block rest part of coins from user */
  const restCoinsToPay = tx.booking.route.price - tx.booking.bookedCoins;
  if (tx.booking.owner.travelCoins < restCoinsToPay) {
    throw new Error('User has not enough coins for booking');
  }
  tx.booking.owner.travelCoins -= restCoinsToPay;
  
  /* update booking status */
  tx.booking.status = 'EXECUTING';
  tx.booking.bookedCoins += restCoinsToPay;
  
  /* create contracts for executing */
  tx.booking.contracts = new Array();
  const betRegistry = await getAssetRegistry('org.travelchain.network.Bet');
  for (let routeElement of tx.booking.route.routeElements) {
    const bets = (await betRegistry.getAll())
    	.filter(bet =>
                bet.route.$identifier === tx.booking.route.routeId
                && bet.routeElement.$identifier === routeElement.routeElementId
                && bet.booking
                && bet.booking.$identifier === tx.booking.bookingId
               );
    if (bets.length === 0) {
      throw new Error(routeElement.title + ' has no bets');
    }
    const minPrice = Math.min(...bets.map(bet => bet.price));
    const selectedBet = bets.find(bet => bet.price === minPrice);
    
    /* create contact */
    const contractId = tx.booking.bookingId + selectedBet.betId;
    const contract = factory.newResource('org.travelchain.network', 'Contract', contractId);
    contract.price = selectedBet.price;
    contract.booking = factory.newRelationship('org.travelchain.network', 'Booking', tx.booking.bookingId);
    contract.routeElement = factory.newRelationship('org.travelchain.network', 'RouteElement', selectedBet.routeElement.$identifier);
    contract.executor = factory.newRelationship('org.travelchain.network', 'Executor', selectedBet.executor.$identifier);
    
    tx.booking.contracts.push(contract);
  }
  
  const userRegistry = await getParticipantRegistry('org.travelchain.network.User');
  await userRegistry.update(tx.booking.owner);
  
  const contractRegistry = await getAssetRegistry('org.travelchain.network.Contract');
  for (let contract of tx.booking.contracts) {
  	await contractRegistry.add(contract);
  }
  
  const bookingRegistry = await getAssetRegistry('org.travelchain.network.Booking');
  await bookingRegistry.update(tx.booking);
}

/**
 * Finish contract
 * @param {org.travelchain.network.FinishContract} tx - the contract to be finished
 * @transaction
 */
async function finishContract(tx) {
  const factory = getFactory();
  
  /* update contract status */
  tx.contract.status = 'FINISHED';
  
  /* transfer coins to executor */
  tx.contract.executor.travelCoins += tx.contract.price;
  
  const executorRegistry = await getParticipantRegistry('org.travelchain.network.Executor');
  await executorRegistry.update(tx.contract.executor);
  
  const contractRegistry = await getAssetRegistry('org.travelchain.network.Contract');
  await contractRegistry.update(tx.contract);
  
  /* check if all contracts are finished */
  const numberOfNotFinishedContracts = tx.contract.booking.contracts
    .filter(contract => contract.status !== 'FINISHED').length;
  if (numberOfNotFinishedContracts === 0) {
    const userRegistry = await getParticipantRegistry('org.travelchain.network.User');
    
    /* mark booking as finished */
    tx.contract.booking.status = 'FINISHED';
    
    /* transfer coins to route creator, content creators, referals, likes */
    const routeCreatorPercent = 0.01;
    const referalPercent = 0.01;
    
    const purchasePrice = tx.contract.booking.bookedCoins;
    
    tx.contract.booking.route.creator.travelCoins += purchasePrice * routeCreatorPercent;
  	await userRegistry.update(tx.contract.booking.route.creator);
    
    if (tx.contract.booking.owner.referal) {
     	tx.contract.booking.owner.referal.travelCoins += purchasePrice * referalPercent;
  		await userRegistry.update(tx.contract.booking.owner.referal);
    }
    
    tx.contract.booking.route.likes
      .forEach(async like => {
        let LIKE_REWARD = 0.01;
      	like.user.travelCoins += LIKE_REWARD;
      	await userRegistry.update(like.user);
      });
    
    tx.contract.booking.route.routeElements
      .filter(routeElement => !!routeElement.usedContents)
      .forEach(routeElement => {
        routeElement.usedContents
          .forEach(async content => {
          	let contentRoyalty = 0;
            if (content.royaltyPrice) {
                contentRoyalty += content.royaltyPrice;
            }
            if (content.royaltyPrice) {
                contentRoyalty += purchasePrice * (content.royaltyPercent / 100);
            }
          	content.creator.travelCoins += contentRoyalty;
  			await userRegistry.update(content.creator);
          });
      });
    
    const bookingRegistry = await getAssetRegistry('org.travelchain.network.Booking');
  	await bookingRegistry.update(tx.contract.booking);
  }
}