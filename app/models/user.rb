class User < ApplicationRecord
	extend Enumerize
	enumerize :role, in: [:user, :admin], default: :user

	has_many :sites, dependent: :destroy

	devise :database_authenticatable, :registerable,
			:recoverable, :rememberable, :trackable, :validatable,
			:omniauthable

	validates_presence_of :first_name, :last_name

	def self.from_omniauth(auth)
		user = find_or_create_by(provider: auth.provider, uid: auth.uid);
		user.provider = auth.provider
		user.uid = auth.uid
		user.first_name = auth.info.name.split(' ')[0]
		user.last_name = auth.info.name.split(' ')[1]
		user.save!
		user
	end

	def self.new_with_session(params, session)
		if session["devise.user_attributes"]
			new(session["devise.user_attributes"]) do |user|
				user.attributes = params
				user.valid?
			end
		else
			super
		end
	end

	def password_required?
		super && provider.blank?
	end

	def email_required?
		super && provider.blank?
	end
end
