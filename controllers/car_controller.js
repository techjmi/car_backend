const Car = require("../model/cars_schema");

// Post new car
const post_Car = async (req, res) => {
    const { title, description, images, tags } = req.body;
    // console.log('the user from post car', req.user);
    const userId = req.user.id;
    // console.log('the user id is', userId);

    try {
        if (!title || !description) {
            return res.status(400).json({ message: 'All fields are required and at least one image must be provided.' });
        }
        
        // Create new car entry
        const newCar = new Car({
            title,
            description,
            images,
            tags,
            user: userId,
        });

        // Save new car to the database
        await newCar.save();
        res.status(201).json({ message: 'Car added successfully', car: newCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all cars
const get_car = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get cars of a specific user
const get_userCar = async (req, res) => {
    const userId = req.user.id;
    // console.log(userId, 'from get all users cars');

    try {
        const userCars = await Car.find({ user: userId });
        res.status(200).json(userCars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a car
const delete_car = async (req, res) => {
    const carId = req.params.id;
    const userId = req.user.id;

    try {
        const car = await Car.findById(carId);
        
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Ensure the car belongs to the current user
        if (car.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You can only delete your own cars' });
        }

        // Delete the car
        await Car.findByIdAndDelete(carId);
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update car details
const update_car = async (req, res) => {
    const carId = req.params.id;
    const { title, description, tags } = req.body;
    const userId = req.user._id;

    try {
        const car = await Car.findById(carId);
        
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Update car details
        car.title = title || car.title;
        car.description = description || car.description;
        car.tags = tags || car.tags;

        // Save updated car
        await car.save();
        res.status(200).json({ message: 'Car updated successfully', car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get car details by ID
const details = async (req, res) => {
    const id = req.params.id;  // Retrieve the car's ID from the URL parameters
  
    try {
        // Find the car by ID
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        
        // Return the car details
        res.status(200).json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
  
module.exports = { post_Car, get_car, get_userCar, delete_car, update_car, details };
