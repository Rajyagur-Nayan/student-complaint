"use server";

import sql from "@/db/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userRegister = async (email: string, password: string) => {
  try {
    const existingUser = await sql`select * from users where email=${email}`;
    if (existingUser.length > 0) {
      return console.log("Email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await sql`
    insert into users (email,password) values (${email},${hashPassword});
    `;
  } catch (error) {
    console.log(error);
  }
};

export const loginData = async (email: string, password: string) => {
  try {
    const key = process.env.TOKEN || "";

    if (!key) {
      throw new Error("JWT secret key (TOKEN) is not defined in env");
    }

    const data = await sql`select*from users where email=${email}`;
    const users = data[0];
    const isMatch = await bcrypt.compare(password, users.password);
    const token = jwt.sign({ id: users.id, email: users.email }, key, {
      expiresIn: "1h",
    });
    console.log(users);

    if (isMatch && data.length > 0) {
      return { id: users.id, email: users.email, token };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const complaint = async (formData: any) => {
  try {
    console.log(formData);
    await sql`insert into complaints (title,description,priority,user_id,category_id) values(${formData.title},${formData.description},${formData.priority},${formData.userId},${formData.category}) `;
    return console.log("data added successfully");
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const data = await sql`select * from categories `;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getComplaints = async () => {
  try {
    const data = await sql`
      SELECT 
        complaints.*, 
        complaints.category_id,
        categories.name AS category_name
      FROM complaints
      LEFT JOIN categories 
        ON complaints.category_id = categories.id
    `;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDashboard = async () => {
  try {
    const total = await sql`select count(id) as count from complaints `;
    const progress =
      await sql`select count(id) as count from complaints where status='IN_PROGRESS' `;
    const resolved =
      await sql`select count(id) as count from complaints where status='RESOLVE' `;
    const pending =
      await sql`select count(id) as count from complaints where status='PENDING'`;
    return {
      total: total[0].count,
      pending: pending[0].count,
      resolved: resolved[0].count,
      progress: progress[0].count,
    };
  } catch (error) {
    console.log(error);
  }
};
