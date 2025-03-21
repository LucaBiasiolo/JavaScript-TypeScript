import 'reflect-metadata';
import { Column, DataSource, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    zipcode: number

    @Column()
    interest_peanut_allergy: boolean

    @Column()
    interest_egg_allergy: boolean

    @Column()
    interest_dairy_allergy: boolean

    @Column()
    is_admin: boolean = false
}

@Entity()
@Unique(['name'])
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    zipcode: number;

    @Column()
    state: string;

    @Column({nullable: true})
    overall_score: number;

    @Column({nullable: true})
    peanuts_score: number;

    @Column({nullable: true})
    egg_score: number;

    @Column({nullable: true})
    dairy_score: number;
}

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database',
    synchronize: true,
    entities: [User, Restaurant],
    logging: ['error'],
    dropSchema: true
});

(async () => {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User);
    const restaurantRepository = AppDataSource.getRepository(Restaurant);

    // fixme: for some reason these queries are launched twice, causing node error
    await userRepository.save({ username: 'admin', password: 'password', zipcode: 36043, city: 'Camisano Vicentino', state: 'Italy', interest_peanut_allergy: true, interest_egg_allergy: true, interest_dairy_allergy: true, is_admin: true });
    await userRepository.save({ username: 'Luca Biasiolo', password: 'password2', zipcode: 36047, city: 'Montegalda',state: 'Italy', interest_peanut_allergy: false, interest_egg_allergy: false, interest_dairy_allergy: false, is_admin: false });

    await restaurantRepository.save({ name: 'La Moma', city: 'Camisano Vicentino', state: 'Italy', zipcode: 36043 });
    await restaurantRepository.save({ name: 'Red Quill', city: 'Vicenza', zipcode: 36100, state: 'Italy' })
    await restaurantRepository.save({ name: 'Al Vecchio Luppolo', city: 'Torri di Quartesolo', zipcode: 36054, state: 'Italy' })
})();